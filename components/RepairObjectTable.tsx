import { machinery } from "@/consts";
import { Input } from "@/equix/Input";
import { buildingOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, Repair } from "@/types";
import { getRepairDescription, toOptions } from "@/utils";
import { observer } from "mobx-react";

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
      описание: getRepairDescription(selectedRepair, selectedRepairType),
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
          {selectedRepairType === "ППР" && <td>Кол-во</td>}
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
              <div className="flex">
                <Input
                  type="radio"
                  options={toOptions(machinery)}
                  value={toOptions(machinery).find((machine) =>
                    object.оборудование.includes(machine.name)
                  )}
                  onChange={(value: InputOption) => {
                    updateRepairObject(object.id, {
                      ...object,
                      оборудование: value.name,
                    });
                    updateDescription();
                  }}
                  isCollapsed
                  className="w-4/5"
                />
                <Input
                  value={object.комментарий}
                  onChange={(value: string) => {
                    updateRepairObject(object.id, {
                      ...object,
                      комментарий: value,
                    });
                    updateDescription();
                  }}
                />
              </div>
            </td>
            {selectedRepairType === "ППР" && <td>
              <Input
                value={object.количество}
                size={4}
                onChange={(value: string) => {
                  updateRepairObject(object.id, {
                    ...object,
                    количество: value,
                  });
                  updateDescription();
                }}
              />
            </td>}
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
