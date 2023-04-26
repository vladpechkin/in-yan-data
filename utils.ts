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
) =>
  utils.sheet_add_aoa(worksheet, [[newContents]], {
    origin: cell,
  });

export const getRepairPrice = (repair: Repair, type: RepairType) => {
  let price = 0;
  repair.работы.map((work) => {
    const pricelistWork = getWorks(type).find(
      (priceListWork: Work) =>
        priceListWork["Содержание работ"] === work["Содержание работ"]
    );
    const цена = pricelistWork ? pricelistWork["Стоимость"] : 0;
    price += цена;
  });
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
  },
  type: RepairType
) => {
  let price = 0;
  repairType.ремонты.map((repair) => (price += getRepairsPrice(repair, type)));
  return price;
};

export const getActPrice = (act: Act) =>
  getRepairTypePrice(act.ППР, "ППР") + getRepairTypePrice(act.ОТР, "ОТР");

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
        `${obj.оборудование.join(", ")} в корп. ${obj.корпус.split(" ")[0]}`
    )
    .join("; ");

  const allWorks = getWorks(type);

  return `Выполнено: ${repair?.работы
    ?.map((work) => `${work["Содержание работ"]}`)
    .join(", ")} (на оборудовании: ${objs} согласно п.п. ${repair?.работы
    ?.map((work) => {
      const w = allWorks.find(
        (typeWork) => typeWork["Содержание работ"] === work["Содержание работ"]
      );
      if (w) return w["№ п.п."];
    })
    .join(", ")} ${
    type === "ППР"
      ? `прейскуранта № ${prices}`
      : "прейскуранта работ по оперативному (текущему) и аварийному ремонту "
  } приложения №${type === "ППР" ? 4 : 5}).`;
};

export const getWorks = (type: RepairType): any[] =>
  type === "ППР"
    ? ppr
        .map((repairType) =>
          repairType.работы.map((work) => ({
            ...work,
            "№ п.п.": `${repairType.номер}.${work["№ п.п."]}`,
          }))
        )
        .flat()
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
