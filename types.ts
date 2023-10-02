import { Dispatch, SetStateAction } from "react";
import { actStates, machinery, measurementUnits, repairTypes } from "./consts";

export type Machine = (typeof machinery)[number];

export type RepairType = (typeof repairTypes)[number];

export type ActState = (typeof actStates)[number];

export type MeasurementUnit = (typeof measurementUnits)[number];

export interface Work {
  id: string;
  "Содержание работ": string;
  единицаИзмерения: MeasurementUnit;
  цена: number;
  количество: string;
  comment: string;
}

export interface RepairObject {
  id: string;
  корпус: string;
  оборудование: Machine;
  комментарий: string,
  количество: string,
}

export interface Shift {
  id: string;
  дата: string;
  сотрудники: string[];
}

export interface Repair {
  id: string;
  работы: Work[];
  доля: number;
  объектыРемонта: RepairObject[];
  смены: Shift[];
  описание: string;

  зона: string;
  сумма: number;
}

export interface Production {
  Код: string;
  Наименование: string;
  Сокращение?: string;
}

export interface Act {
  id: string;
  ППР: {
    наряды: string;
    ремонты: Repair[];
    стоимость: number;
  };
  ОТР: {
    наряды: string;
    ремонты: Repair[];
    стоимость: number;
  };
  отчетныйПериод: string;
  производство: string;
  состояние: ActState;
  примечание: string;
  выделен: boolean;
}

export interface InputOption {
  name: string;
  id: string;
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface ActProps {
  act: Act;
  setAct: Dispatch<SetStateAction<Act>>;
}
