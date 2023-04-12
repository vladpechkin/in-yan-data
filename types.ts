import { Dispatch, SetStateAction } from "react";
import { actStates, machinery, measurementUnits, repairTypes } from "./consts";

export interface Pr {
  "Итого за месяц  без НДС, руб в 2022 году": number;
  "Годовая стоимость  обслуживания  без НДС, руб в 2022 году": number;
  "Итого за месяц  без НДС, руб в 2023 году": number;
  "Годовая стоимость  обслуживания  без НДС, руб в 2023 году": number;
  "Итого за месяц без НДС, руб в 2024 году": number;
  "Годовая стоимость  обслуживания  без НДС, руб в 2024 году": number;
  "Итого за месяц без НДС, руб в 2025 году": number;
  "Годовая стоимость  обслуживания  без НДС, руб в 2025 году": number;
  works: PriceWork[];
}

export interface PriceWork {
  "№ п.п.": number;
  "Содержание работ": string;
  "Периодичность работ": string;
  "Месячная стоимость  обслуживания  без НДС, руб в 2022 году": number;
  "Месячная стоимость  обслуживания  без НДС, руб в 2023 году": number;
  "Месячная стоимость  обслуживания  без НДС, руб в 2024 году": number;
  "Месячная стоимость  обслуживания  без НДС, руб в 2025 году": number;
}

export type Machine = typeof machinery[number];

export type RepairType = typeof repairTypes[number];

export type ActState = typeof actStates[number];

export type MeasurementUnit = typeof measurementUnits[number];

export interface Work {
  id: string;
  номерПункта?: number;
  "Содержание работ": string;
  единицаИзмерения: MeasurementUnit;
  цена: number;
  количество: number;
}

interface Building {
  Код: string;
  Наименование: string;
  Зона: string;
}

export interface RepairObject {
  id: string;
  корпус: string;
  оборудование: Machine[];
}

interface Employee {
  "Ф.И.О.": string;
  Должность: string;
  Компания: string;
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
  };
  ОТР: {
    наряды: string;
    ремонты: Repair[];
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
