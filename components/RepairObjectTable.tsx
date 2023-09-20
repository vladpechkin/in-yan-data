import { machinery } from "@/consts";
import { Input } from "@/equix/Input";
import { buildingOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, Repair } from "@/types";
import { getRepairDescription, toOptions } from "@/utils";
import { observer } from "mobx-react";
import { useState } from "react";

export const RepairObjectTable = observer(() => {
  const {
    selectedRepair,
    deleteRepairObject,
    createRepairObject,
    updateRepairObject,
    setSelectedRepair,
    selectedRepairType,
  } = useStore();

  const updateDescription = () =>
    setSelectedRepair({
      описание: getRepairDescription(
        selectedRepair,
        selectedRepairType
      ),
    });

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th colSpan={100}>Наряды</th>
        </tr>
        <tr>
          <td>Корпус</td>
          <td>Оборудование</td>
          <td>Комментарий</td>
          {(selectedRepair as Repair).объектыРемонта.length > 1 && (
            <td>Действия</td>
          )}
        </tr>
        {(selectedRepair as Repair).объектыРемонта.map((object, index) => (
          <tr key={index}>
            <td>
              <Input
                type="radio"
                options={buildingOptions}
                value={buildingOptions.find(
                  (option) => option.name === object.корпус
                )}
                minOptions={1}
                onChange={(value: InputOption) => {
                  updateRepairObject(object.id, {
                    ...object,
                    корпус: value.name,
                  });
                  updateDescription();
                }}
              />
            </td>
            <td>
              <Input
                type="checkbox"
                options={toOptions(machinery)}
                value={toOptions(machinery).filter((machine) =>
                  object.оборудование.includes(machine.name)
                )}
                onChange={(value: InputOption[]) => {
                  updateRepairObject(object.id, {
                    ...object,
                    оборудование: value.map(({ name }) => name),
                  });
                  updateDescription();
                }}
                isCollapsed
                className="w-4/5"
              />
            </td>
            <td>
              <Input
                value={object.comment}
                onChange={(value: string) => {
                  updateRepairObject(object.id, {
                    ...object,
                    comment: value,
                  });
                  updateDescription();
                }}
              />
            </td>
            {(selectedRepair as Repair).объектыРемонта.length > 1 && (
              <td className="w-20">
                <button
                  className="text-red-600 w-full text-center"
                  onClick={() => {
                    const confirmed = confirm("Подтвердите удаление");
                    if (confirmed) {
                      deleteRepairObject(object.id);
                      updateDescription();
                    }
                  }}
                >
                  Удалить
                </button>
              </td>
            )}
          </tr>
        ))}
        <tr>
          <td colSpan={100}>
            <button className="w-full" onClick={() => createRepairObject()}>
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
