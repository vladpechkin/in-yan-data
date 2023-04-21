import {
  getEmptyAct,
  getEmptyRepairObject,
  getEmptyShift,
  getEmptyWork,
} from "./consts";
import { Act, Repair, RepairObject, RepairType, Shift, Work } from "./types";

interface Store {
  acts: Act[];
  selectedAct: Act;
  selectedRepairType: null | RepairType;
  selectedRepair: null | Repair;
  setActs: (acts: Act[]) => void;
  setSelectedRepairType: (type: RepairType) => void;

  setSelectedAct: (act: Partial<Act>) => void;
  setSelectedRepair: (repair: Partial<Repair>) => void;

  saveAct: () => void;
  deleteAct: (id: string) => void;

  saveRepair: () => void;
  deleteRepair: (id: string) => void;

  createRepairObject: () => void;
  updateRepairObject: (id: string, object: RepairObject) => void;
  deleteRepairObject: (id: string) => void;

  createWork: () => void;
  updateWork: (id: string, work: Work) => void;
  deleteWork: (id: string) => void;

  createShift: () => void;
  updateShift: (id: string, shift: Shift) => void;
  deleteShift: (id: string) => void;

  getSelectedWorks: () => void;
}

export const createStore = (): Store => ({
  acts: [
    {
      id: "4c6a23ac-24c3-4f87-b36d-28c4956c5bde",
      ППР: {
        наряды: "101 от 05.04.2023",
        ремонты: [
          {
            id: "f2d31b77-f08c-4b3a-98f4-fac7b53707f7",
            зона: "ЭЗЗ (Маврин Д. Е.)",
            доля: 40,
            объектыРемонта: [
              {
                id: "98685908-829f-4c04-8d0a-20738ca913e5",
                корпус: "104/1 ЭЗЗ Эстакада теплопроводов (западный ввод)",
                оборудование: [
                  "преобразователь давления",
                  "преобразователь температуры",
                ],
              },
              {
                id: "09f4f2ee-2bcd-42b0-af44-2d53bcdd6fdb",
                корпус: "85 ЭВЗ Эксплуатационная база околотка пути",
                оборудование: ["ультразвуковой расходомер"],
              },
            ],
            описание:
              "Выполнено: Проверка прочности и герметичности линий подвода давления, отборных устройств в резьбовых, фланцевых и сварных соединениях, Проверка заземления корпуса (на оборудовании: преобразователь давления, преобразователь температуры в корп. 104/1; ультразвуковой расходомер в корп. 85 согласно п.п. 1, 5 прейскуранта № 1, 2 приложения №4).",
            работы: [
              {
                id: "cef66ef2-403b-4d1c-90a6-89a1204f47bd",
                "Содержание работ":
                  "Проверка прочности и герметичности линий подвода давления, отборных устройств в резьбовых, фланцевых и сварных соединениях",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 1000,
              },
              {
                id: "4aec36b3-4e08-498d-a89e-0ead1210e0ce",
                "Содержание работ": "Проверка заземления корпуса",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 500,
              },
            ],
            смены: [
              {
                id: "30a70738-9178-4a5d-a6de-476c770e7977",
                дата: "2023-04-10T12:30:14.648Z",
                сотрудники: ["Акинин Владимир Николаевич"],
              },
            ],
          },
          {
            id: "f2d31b77-f08c-4b3a-98f4-fac7b53707f7",
            зона: "ЭЗЗ (Маврин Д. Е.)",
            доля: 40,
            объектыРемонта: [
              {
                id: "98685908-829f-4c04-8d0a-20738ca913e5",
                корпус: "104/1 ЭЗЗ Эстакада теплопроводов (западный ввод)",
                оборудование: ["преобразователь давления"],
              },
              {
                id: "09f4f2ee-2bcd-42b0-af44-2d53bcdd6fdb",
                корпус: "85 ЭВЗ Эксплуатационная база околотка пути",
                оборудование: ["ультразвуковой расходомер"],
              },
            ],
            описание: "",
            работы: [
              {
                id: "4aec36b3-4e08-498d-a89e-0ead1210e0ce",
                "Содержание работ": "Проверка заземления корпуса",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 10000,
              },
            ],
            смены: [
              {
                id: "30a70738-9178-4a5d-a6de-476c770e7977",
                дата: "2023-04-10T12:30:14.648Z",
                сотрудники: ["Акинин Владимир Николаевич"],
              },
            ],
          },
        ],
      },
      ОТР: {
        наряды: "",
        ремонты: [
          {
            id: "f2d31b77-f08c-4b3a-98f4-fac7b53707f7",
            зона: "ЭЗЗ (Маврин Д. Е.)",
            доля: 40,
            объектыРемонта: [
              {
                id: "98685908-829f-4c04-8d0a-20738ca913e5",
                корпус: "104/1 ЭЗЗ Эстакада теплопроводов (западный ввод)",
                оборудование: [
                  "преобразователь давления",
                  "преобразователь температуры",
                ],
              },
              {
                id: "09f4f2ee-2bcd-42b0-af44-2d53bcdd6fdb",
                корпус: "85 ЭВЗ Эксплуатационная база околотка пути",
                оборудование: ["ультразвуковой расходомер"],
              },
            ],
            описание:
              "Выполнено: Проверка прочности и герметичности линий подвода давления, отборных устройств в резьбовых, фланцевых и сварных соединениях, Проверка заземления корпуса (на оборудовании: преобразователь давления, преобразователь температуры в корп. 104/1; ультразвуковой расходомер в корп. 85 согласно п.п. 1, 5 прейскуранта № 1, 2 приложения №4).",
            работы: [
              {
                id: "cef66ef2-403b-4d1c-90a6-89a1204f47bd",
                "Содержание работ":
                  "Проверка прочности и герметичности линий подвода давления, отборных устройств в резьбовых, фланцевых и сварных соединениях",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 1000,
              },
              {
                id: "4aec36b3-4e08-498d-a89e-0ead1210e0ce",
                "Содержание работ": "Проверка заземления корпуса",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 500,
              },
            ],
            смены: [
              {
                id: "30a70738-9178-4a5d-a6de-476c770e7977",
                дата: "2023-04-10T12:30:14.648Z",
                сотрудники: ["Акинин Владимир Николаевич"],
              },
            ],
          },
          {
            id: "f2d31b77-f08c-4b3a-98f4-fac7b53707f7",
            зона: "ЭЗЗ (Маврин Д. Е.)",
            доля: 40,
            объектыРемонта: [
              {
                id: "98685908-829f-4c04-8d0a-20738ca913e5",
                корпус: "104/1 ЭЗЗ Эстакада теплопроводов (западный ввод)",
                оборудование: ["преобразователь давления"],
              },
              {
                id: "09f4f2ee-2bcd-42b0-af44-2d53bcdd6fdb",
                корпус: "85 ЭВЗ Эксплуатационная база околотка пути",
                оборудование: ["ультразвуковой расходомер"],
              },
            ],
            описание: "",
            работы: [
              {
                id: "4aec36b3-4e08-498d-a89e-0ead1210e0ce",
                "Содержание работ": "Проверка заземления корпуса",
                единицаИзмерения: "шт.",
                количество: 1,
                цена: 500,
              },
            ],
            смены: [
              {
                id: "30a70738-9178-4a5d-a6de-476c770e7977",
                дата: "2023-04-10T12:30:14.648Z",
                сотрудники: ["Акинин Владимир Николаевич"],
              },
            ],
          },
        ],
      },
      выделен: true,
      отчетныйПериод: "04.2023",
      примечание: "перепроверить!!!",
      производство: "00001 Руководство АО АВТОВАЗ",
      состояние: "Подписан",
    },
  ],
  selectedAct: getEmptyAct(),
  selectedRepairType: null,
  selectedRepair: null,
  setActs(acts) {
    this.acts = acts;
  },
  setSelectedRepairType(type) {
    this.selectedRepairType = type;
  },

  setSelectedAct(act) {
    this.selectedAct = { ...this.selectedAct, ...act } as Act;
  },
  setSelectedRepair(repair) {
    this.selectedRepair = { ...this.selectedRepair, ...repair } as Repair;
  },

  saveAct() {
    const index = this.acts.findIndex((x) => x.id === this.selectedAct?.id);
    if (index >= 0) {
      this.acts[index] = this.selectedAct;
    } else this.acts.push(this.selectedAct);
  },
  deleteAct() {
    const id = this.selectedAct?.id;
    this.acts = this.acts.filter((x) => x.id !== id);
  },

  saveRepair() {
    if (this.selectedRepairType) {
      const index = this.selectedAct[this.selectedRepairType].ремонты.findIndex(
        (x) => x.id === this.selectedRepair?.id
      );

      Object.assign(
        this.selectedAct[this.selectedRepairType].ремонты[index],
        this.selectedRepair
      );
    }
  },
  deleteRepair(id) {
    if (this.selectedRepairType)
      this.selectedAct[this.selectedRepairType].ремонты = this.selectedAct[
        this.selectedRepairType
      ].ремонты.filter((x: Repair) => x.id !== id);
  },

  createRepairObject() {
    this.selectedRepair?.объектыРемонта.push(getEmptyRepairObject());
  },
  updateRepairObject(id, newObject) {
    const index = this.selectedRepair?.объектыРемонта.findIndex(
      (x) => x.id === id
    );
    if (this.selectedRepair && index !== undefined) {
      this.selectedRepair.объектыРемонта[index] = newObject;
    }
  },
  deleteRepairObject(id) {
    if (this.selectedRepair) {
      this.selectedRepair.объектыРемонта =
        this.selectedRepair.объектыРемонта.filter((x) => x.id !== id);
    }
  },

  createWork() {
    this.selectedRepair?.работы.push(getEmptyWork());
  },
  updateWork(id, newWork) {
    const index = this.selectedRepair?.работы.findIndex((x) => x.id === id);
    if (this.selectedRepair && index !== undefined) {
      this.selectedRepair.работы[index] = newWork;
    }
  },
  deleteWork(id) {
    if (this.selectedRepair) {
      this.selectedRepair.работы = this.selectedRepair.работы.filter(
        (x) => x.id !== id
      );
    }
  },

  createShift() {
    this.selectedRepair?.смены.push(getEmptyShift());
  },
  updateShift(id, newShift) {
    const index = this.selectedRepair?.смены.findIndex((x) => x.id === id);
    if (this.selectedRepair && index !== undefined) {
      this.selectedRepair.смены[index] = newShift;
    }
  },
  deleteShift(id) {
    if (this.selectedRepair) {
      this.selectedRepair.смены = this.selectedRepair.смены.filter(
        (x) => x.id !== id
      );
    }
  },

  getSelectedWorks() {
    return this.selectedRepair?.работы;
  },
});
