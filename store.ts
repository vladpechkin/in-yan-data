import {
  getEmptyAct,
  getEmptyRepairObject,
  getEmptyShift,
  getEmptyWork,
} from "./consts";
import { Act, Repair, RepairObject, RepairType, Shift, Work } from "./types";
import { capitalize, getActSum } from "./utils";
// @ts-ignore
import { rubles } from "rubles";

interface Store {
  selectedAct: Act;
  selectedRepairType: null | RepairType;
  selectedRepair: null | Repair;
  setSelectedRepairType: (type: RepairType) => void;

  setSelectedAct: (act: Partial<Act>) => void;
  setSelectedRepair: (repair: Partial<Repair>) => void;

  saveAct: (method: string) => void;
  deleteAct: (id: string) => void;
  writeAct: () => void;

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

  getSelectedRepair: () => void;

  saveEntity: (
    entityName: string,
    entityId: number,
    newEntity?: object,
  ) => void;
  deleteEntity: (entityName: string, entityId: number) => void;
}

export const createStore = (): Store => ({
  selectedAct: getEmptyAct(),
  selectedRepairType: null,
  selectedRepair: null,
  getSelectedRepair() {
    return this.selectedRepair;
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

  saveAct(method) {
    return fetch(
      `/api/acts${method === "PUT" ? `/${this.selectedAct.id}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedAct),
      },
    );
  },
  deleteAct() {
    return fetch(`/api/acts/${this.selectedAct.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  writeAct() {
    const actPrice = getActSum(this.selectedAct);

    return fetch("/api/sheet", {
      method: "POST",
      body: JSON.stringify({
        ...this.selectedAct,
        price: actPrice,
        priceRub: capitalize(rubles(actPrice * 1.2).toLocaleString("ru")),
        ndsRub: capitalize(rubles(actPrice * 0.2)),
      }),
    });
  },

  saveEntity(entityName, entityId, newEntity) {
    fetch(`/api/${entityName}${entityId ? `/${entityId}` : ""}`, {
      method: entityId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntity || this.selectedAct),
    })
      .then((res) => res.json())
      .then(() => alert("Сохранено"));
  },
  deleteEntity(entityName, entityId) {
    fetch(`/api/${entityName}/${entityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => alert("Удалено"));
  },

  saveRepair() {
    if (this.selectedRepairType) {
      const index = this.selectedAct[this.selectedRepairType].ремонты.findIndex(
        (x) => x.id === this.selectedRepair?.id,
      );

      Object.assign(
        this.selectedAct[this.selectedRepairType].ремонты[index],
        this.selectedRepair,
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
      (x) => x.id === id,
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
        (x) => x.id !== id,
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
        (x) => x.id !== id,
      );
    }
  },

  getSelectedWorks() {
    return this.selectedRepair?.работы;
  },
});
