import { prejskuranti } from "@/consts";
import { RepairType } from "@/types";
import { WorkSheet, utils } from "xlsx";
import otr from "./public/prices-otr.json";
import ppr from "./public/prices-ppr.json";
import { Act, InputOption, Repair } from "./types";

export const toOptions = (arr: readonly string[]): InputOption[] =>
  arr.map((name, index) => ({
    name,
    id: index.toString(),
  }));

export const areEntitiesEqual = (x: any, y: any): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => areEntitiesEqual(x[key], y[key]))
    : x === y;
};

export const getChangeableKeys = (entityName: string) => {
  switch (entityName) {
    case "employees":
      return ["id","Ф.И.О.", "Должность", "Компания"];
    case "buildings":
      return ["Код", "Наименование", "Зона"];
    case "productions":
      ["Код", "Наименование", "Сокращение"];
    default:
      return null;
  }
};

export const getMonthLength = (month: number, year: number) => {
  if (month === 2 && year % 4 == 0 && year % 100 != 0) return 29;
  switch (month) {
    case 2:
      return 28;
    case 4:
    case 6:
    case 9:
    case 10:
      return 30;
    default:
      return 31;
  }
};

export const getRepairTypePrice = (repairType: {
  наряды: string;
  ремонты: Repair[];
}) => {
  let sum = 0;
  repairType.ремонты.map((repair) => (sum += getRepairSum(repair)));
  return sum;
};

export const getActPrice = (act: Act) =>
  getRepairTypePrice(act.ППР) + getRepairTypePrice(act.ОТР);

export const getRepairDescription = (repair: Repair, type: RepairType) => {
  const machinery = repair?.объектыРемонта
    ?.map((object) => object?.оборудование)
    .flat();

  const prices = [
    ...new Set(
      prejskuranti
        .map((price) =>
          machinery?.map((machine) => {
            if (price.oborudovanie.includes(machine)) return price.id;
          })
        )
        .flat()
        .filter(Boolean)
    ),
  ].join(", ");

  const objs = repair.объектыРемонта
    .map(
      (obj) =>
        `${obj.оборудование}${obj.комментарий ? ` ${obj.комментарий}` : ""}, ${
          obj.количество
        }шт. в корп. ${obj.корпус.split(" ")[0].replaceAll(/\s[а-яА-Я]/g, "")}`
    )
    .join("; ");

  return `Выполнено: ${repair?.работы
    ?.map(
      (work) =>
        `п. ${work.comment || ""}${
          type === "ОТР" ? `, ${work.количество} ${work.единицаИзмерения}` : ""
        }`
    )
    .join(", ")} (на оборудовании: ${objs}, согласно ${
    type === "ППР"
      ? `прейскуранту № ${prices}`
      : "прейскуранту работ по оперативному (текущему) и аварийному ремонту "
  } приложения №${type === "ППР" ? 4 : 5}; Доля пр-ва: ${repair.доля}%)`.replaceAll("  ", " ");
};

export const getWorks = (type: RepairType) =>
  type === "ППР"
    ? Object.fromEntries(
        ppr.map((group) => Object.entries(group.работы)).flat()
      )
    : otr;

export const getSeasonColor = (date: string) => {
  const month = parseInt(date.slice(0, 2));
  return month === 12 || month <= 2
    ? "bg-blue-100"
    : month >= 3 && month <= 5
    ? "bg-pink-600"
    : month >= 6 && month <= 8
    ? "bg-green-50"
    : "bg-orange-50";
};

export const sheet_to_aoa = (sheet: WorkSheet): unknown[][] =>
  utils.sheet_to_json(sheet, { header: 1 });

export const format = (string: string | number) =>
  string
    .toLocaleString("ru", { style: "currency", currency: "RUB" })
    .replace("₽", "");

export const capitalize = (word: string) =>
  !word ? '' : word.charAt(0).toUpperCase() + word.slice(1);

export const getWorksAmount = (repair: Repair) => {
  let amount = 0;
  repair.работы.map((job) => {
    amount += parseInt(job.количество);
  });
  return amount;
};

export const getMachineryAmount = (repair: Repair) => {
  let amount = 0;
  repair.объектыРемонта.map((obj) => {
    amount += parseInt(obj.количество);
  });
  return amount;
};

export const getRepairAmount = (repair: Repair) =>
  getMachineryAmount(repair) * getWorksAmount(repair);

export const getRepairPrice = (repair: Repair) => {
  let amount = 0;
  repair.работы.map((job) => {
    amount += job.цена * parseInt(job.количество);
  });
  return (amount / 100) * repair.доля;
};

export const getRepairSum = (repair: Repair) =>
  getRepairPrice(repair) * getMachineryAmount(repair);

export const getActSum = (act: Act) =>
  getRepairTypePrice(act.ППР) + getRepairTypePrice(act.ОТР)

  export const renderInt = (number: number) => number.toFixed(2).replace('.', ",")
