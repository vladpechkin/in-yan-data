import { prejskuranti } from "@/consts";
import { Machine, RepairType } from "@/types";
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

export const overwriteAct = (act: Act) => {
  fetch(`/in.xls`)
    .then((res) => res.arrayBuffer())
    .then((res) => {
      const file = read(new Uint8Array(res), {
        type: "array",
      });
      const worksheet = file.Sheets[file.SheetNames[0]];

      const hasPpr = act.ППР.ремонты.length > 0;
      const hasOtr = act.ОТР.ремонты.length > 0;

      const pprOrders = `согласно заказа по ППР ${act.ППР.наряды}`;
      const otrOrders = `согласно заказа по О(Т)Р ${act.ППР.наряды}`;

      editCell(worksheet, "B16", hasPpr ? pprOrders : otrOrders);

      hasPpr && hasOtr && editCell(worksheet, "B17", otrOrders);

      const pprHeading = `${
        hasOtr ? "Ι. " : ""
      }Планово-предупредительный ремонт`;
      const otrHeading = `${hasPpr ? "ΙΙ. " : ""}Оперативный (текущий) ремонт`;

      editCell(worksheet, "B22", hasPpr ? pprHeading : otrHeading);

      if (hasPpr) {
        const index = 0;
        const repair = act.ППР.ремонты[index];
        // act.ППР.ремонты.map((repair, index) => {
        editCell(worksheet, `B${23 + index}`, (index + 1).toString());
        editCell(
          worksheet,
          `D${23 + index}`,
          getRepairDescription(repair, "ППР")
        );
        editCell(
          worksheet,
          `AD${23 + index}`,
          getRepairPrice(repair).toString()
        );
        // });
        editCell(
          worksheet,
          `D${25}`,
          `Итого по планово-предупредительному ремонту`
        );
        editCell(worksheet, `AD${25}`, getRepairTypePrice(act.ППР).toString());
      }

      if (hasOtr) {
        editCell(
          worksheet,
          `D${25}`,
          `Итого по оперативному (текущему) ремонту`
        );
        editCell(worksheet, `AD${25}`, getRepairTypePrice(act.ППР).toString());
      }

      // B23+ - Номер ремонта
      // C23+ - Описание ремонта
      // U23+ - шт.
      // X23+ - Сумма всех Работа["цена"]
      // Z23+ - Количество оборудования в объектах ремонта
      // AD23+ - Сумма всех Работа["сумма"]
      // D38 - Итого по ТипРемонта
      // AD38 - Сумма AD23:AD37
      // AD42 - Сумма итогов по ТипРемонта
      // AD43 - AD42*0.2
      // AD44 - AD43*1.2
      // AD45 - AD44
      // A46 - Всего к оплате: тридцать, в т.ч.
      writeFile(file, "out.xls");
    });
};

export const getRepairPrice = (repair: Repair) => {
  let price = 0;
  repair.работы.map((work) => (price += work.количество * work.цена));
  return price;
};

export const getRepairTypePrice = (repairType: {
  наряды: string;
  ремонты: Repair[];
}) => {
  let price = 0;
  repairType.ремонты.map((repair) => (price += getRepairPrice(repair)));
  return price;
};

export const getActPrice = (act: Act) =>
  getRepairTypePrice(act.ППР) + getRepairTypePrice(act.ОТР);

export const getWorksByMachine = (machine: Machine, type: RepairType) =>
  type === "ППР"
    ? ppr.find((price) => price.оборудование.includes(machine))?.работы
    : otr;

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

  console.log(prices);

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
  type === "ППР" ? ppr.map(({ работы }) => работы).flat() : otr;
