import { prejskuranti } from "@/consts";
import { Machine, RepairObject, RepairType, Work } from "@/types";
import { read, utils, WorkSheet, writeFile } from "xlsx";
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
      return ["Ф.И.О.", "Должность", "Компания"];
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

export const editCell = (
  worksheet: WorkSheet,
  cell: string,
  newContents: string
) => {
  worksheet.getRange(cell).activate();
  worksheet.getCurrentCell().setValue(newContents);
};

export const getRepairPrice = (repair: Repair, type: RepairType) => {
  let price = 0;
  const works = getWorks(type);
  repair.работы.map((work) => (price += works[work["Содержание работ"]]));
  return price;
};

export const getRepairAmount = (repair: Repair) =>
  repair.объектыРемонта
    ?.map((объектРемонта: RepairObject) =>
      объектРемонта?.оборудование?.map((оборудование) => оборудование)
    )
    .flat().length;

export const getRepairsPrice = (repair: Repair, type: RepairType) =>
  getRepairPrice(repair, type) * getRepairAmount(repair);

export const getRepairTypePrice = (
  repairType: {
    наряды: string;
    ремонты: Repair[];
  }) => (repairType.ремонты as Repair[])
.map((r) => r.сумма)
.reduce((partialSum, a) => partialSum + a, 0)

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
        `${obj.оборудование.join(", ")} в корп. ${obj.корпус
          .split(" ")[0]
          .replaceAll(/[а-яА-Я]/g, "")}`
    )
    .join("; ");

  return `Выполнено: ${repair?.работы
    ?.map((work) => `п. ${work["Содержание работ"]}`)
    .join(", ")} (на оборудовании: ${objs}, согласно ${
    type === "ППР"
      ? `прейскуранту № ${prices}`
      : "прейскуранту работ по оперативному (текущему) и аварийному ремонту "
  } приложения №${type === "ППР" ? 4 : 5}).`.replaceAll("  ", " ");
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
  word.charAt(0).toUpperCase() + word.slice(1);
