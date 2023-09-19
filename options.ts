import buildings from "./public/buildings.json";
import employees from "./public/employees.json";
import masters from "./public/masters.json";
import productions from "./public/productions.json";
import { toOptions } from "./utils";

export const productionOptions = toOptions(
  productions.map((production) =>
    `${production.Код} ${production.Сокращение || " "} ${
      production.Наименование
    }`.replaceAll("  ", " ")
  )
);

export const buildingOptions = toOptions(
  buildings.map((building) =>
    `${building.Код} ${building.Зона || " "} ${building.Наименование}`.replace(
      "  ",
      ""
    )
  )
);

export const employeeOptions = toOptions(
  employees.map((employee) => employee["Ф.И.О."])
);

export const areaOptions = toOptions(
  masters.map((master) => `${master.Зона} (${master["Ф.И.О."]})`)
);
