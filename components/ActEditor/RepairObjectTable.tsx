import { machinery } from "@/consts";
import { getEmptyRepairObject } from "@/consts";
import { buildingOptions } from "@/options";
import { InputOption, RepairObject } from "@/types";
import { toOptions } from "@/utils";
import { FC } from "react";
import { Input } from "../Equix/Input";

interface Props {
  repairObjects: RepairObject[];
  setRepairObjects: (value: RepairObject[]) => void;
  replaceRepairObject: (value?: RepairObject) => void;
}

export const RepairObjectTable: FC<Props> = ({
  repairObjects,
  setRepairObjects,
  replaceRepairObject,
}) => (
  <table className="w-full">
    <tbody>
      <tr>
        <th colSpan={100}>Объекты проведения ремонта</th>
      </tr>
      <tr>
        <th>Корпус</th>
        <th>Оборудование</th>
        <th>Действия</th>
      </tr>
      {repairObjects.map((object, index) => (
        <tr key={index}>
          <td>
            <Input
              type="radio"
              options={buildingOptions}
              value={buildingOptions.find(
                (option) => option.name === object.корпус
              )}
              minOptions={1}
              onChange={(value: InputOption) =>
                replaceRepairObject({ ...object, корпус: value.name })
              }
            />
          </td>
          <td>
            <Input
              type="checkbox"
              options={toOptions(machinery)}
              value={toOptions(machinery).filter((machine) =>
                object.оборудование.includes(machine.name)
              )}
              onChange={(value: InputOption[]) =>
                replaceRepairObject({
                  ...object,
                  оборудование: value.map(({ name }) => name),
                })
              }
              isCollapsed
              className="w-4/5"
            />
          </td>
          <td className="w-20">
            <button
              className="text-red-600 w-full text-center"
              onClick={() => {
                replaceRepairObject();
              }}
            >
              Удалить
            </button>
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={100}>
          <button
            className="w-full"
            onClick={() => {
              setRepairObjects([...repairObjects, getEmptyRepairObject()]);
            }}
          >
            Добавить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);
