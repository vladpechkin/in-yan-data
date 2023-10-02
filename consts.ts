import { v4 as uuidv4 } from "uuid";
import { Act, Repair, RepairObject, Shift, Work } from "./types";

export const prejskuranti = [
  {
    id: 1,
    cell: "4",
    oborudovanie: [
      "преобразователь давления",
      "преобразователь температуры",
      "манометр",
    ],
  },
  {
    id: 2,
    cell: "17",
    oborudovanie: [
      "ультразвуковой расходомер",
      "электромагнитный, вихревой, ротационный и аналогичный расходомер/механический счетчик",
      "расходомер",
    ],
  },
  {
    id: 3,
    cell: "50",
    oborudovanie: ["уровнемер"],
  },
  {
    id: 4,
    cell: "76",
    oborudovanie: ["регистратор"],
  },
  {
    id: 5,
    cell: "89",
    oborudovanie: ["узел учета"],
  },
  {
    id: 6,
    cell: "95",
    oborudovanie: ["преобразователь протокола"],
  },
  {
    id: 7,
    cell: "110",
    oborudovanie: ["контроллер", "модуль аналогового ввода"],
  },
  {
    id: 8,
    cell: "126",
    oborudovanie: ["панель оператора"],
  },
  {
    id: 9,
    cell: "138",
    oborudovanie: ["электропривод регулирующего клапана"],
  },
  {
    id: 10,
    cell: "150",
    oborudovanie: ["тепловычислитель"],
  },
  {
    id: 11,
    cell: "169",
    oborudovanie: ["регулятор температуры"],
  },
];

export const machinery = prejskuranti
  .map(({ oborudovanie }) => oborudovanie)
  .flat()
  .sort((a, b) => a.localeCompare(b));

export const actStates = [
  "Не подписан",
  "Подписан",
  "Счет-фактура",
  "В казне",
] as const;

export const repairTypes = ["ППР", "ОТР"] as const;

export const measurementUnits = [
  "система",
  "шт.",
  "ед.",
  "компл.",
  "рейс",
  "п. м.",
  "шкаф",
  "узел учета",
  "пара",
  "кг.",
  "секция",
  "регистр",
  "наряд",
  "узел",
] as const;

export const getEmptyShift = (): Shift => ({
  id: uuidv4(),
  дата: new Date().toISOString(),
  сотрудники: [],
});

export const getEmptyWork = (): Work => ({
  id: uuidv4(),
  единицаИзмерения: "шт.",
  количество: "1",
  "Содержание работ": "",
  цена: 0,
  comment: ""
});

export const getEmptyRepairObject = (): RepairObject => ({
  id: uuidv4(),
  корпус: "",
  оборудование: "",
  комментарий: "",
  количество: "1"
});

export const getEmptyRepair = (): Repair => ({
  id: uuidv4(),
  зона: "",
  доля: 100,
  объектыРемонта: [getEmptyRepairObject()],
  описание: "Выполнено: ",
  работы: [getEmptyWork()],
  смены: [getEmptyShift()],
  сумма: 0
});

export const getEmptyAct = (): Act => ({
  id: uuidv4(),
  ППР: {
    наряды: "",
    ремонты: [],
    стоимость: 0
  },
  ОТР: {
    наряды: "",
    ремонты: [],
    стоимость: 0
  },
  выделен: false,
  отчетныйПериод: new Date()
    .toLocaleDateString("ru", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit",
    })
    .split(".")
    .reverse()
    .join("-"),
  примечание: "",
  производство: "",
  состояние: actStates[0],
});
