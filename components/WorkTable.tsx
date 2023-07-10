import { measurementUnits } from "@/consts";
import { Input } from "@/equix/Input";
import { useStore } from "@/pages/_app";
import { InputOption, Repair } from "@/types";
import { getRepairDescription, getWorks, toOptions } from "@/utils";
import { observer } from "mobx-react";
import { useState } from "react";

export const WorkTable = observer(() => {
  const {
    selectedRepair,
    setSelectedRepair,
    createWork,
    deleteWork,
    updateWork,
    selectedRepairType,
    getSelectedWorks,
  } = useStore();

  const workOptions = toOptions(Object.keys(getWorks(selectedRepairType)));

  const updateDescription = () =>
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType),
    });

  const [isRadioOpen, setIsRadioOpen] = useState(false);

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th colSpan={100}>Проведенные работы</th>
        </tr>
        <tr>
          <th>Тип работы</th>
          <th>Кол-во</th>
          <th>Ед. изм.</th>
          <th>Цена</th>
          {(selectedRepair as Repair).работы.length > 1 && <th>Действия</th>}
        </tr>
        {(selectedRepair as Repair).работы.map((work, index) => {
          return (
            <tr key={index}>
              <td>
                <Input
                  type="radio"
                  options={workOptions}
                  value={workOptions.find((option) =>
                    work["Содержание работ"].includes(option.name)
                  )}
                  isCollapsed
                  isDialogOpen={isRadioOpen}
                  onChange={(value: InputOption) => {
                    work["Содержание работ"] = value.name;
                    work["цена"] =
                      getWorks(selectedRepairType)[work["Содержание работ"]];
                    updateDescription();
                  }}
                />
              </td>
              <td className="w-20">
                {work.количество}
              </td>
              <td className="w-16">
                {selectedRepairType === "ППР" ? (
                  "шт."
                ) : (
                  <Input
                    type="radio"
                    options={toOptions(measurementUnits)}
                    value={toOptions(measurementUnits).find((option) =>
                      work.единицаИзмерения.includes(option.name)
                    )}
                    onChange={(value: InputOption) => {
                      updateWork(work.id, {
                        ...work,
                        единицаИзмерения: value.name,
                      });
                      updateDescription();
                    }}
                  />
                )}
              </td>
              <td>{work["цена"]}</td>

              {(selectedRepair as Repair).работы.length > 1 && (
                <td className="w-20">
                  <button
                    className="text-red-600 w-full text-center"
                    onClick={() => {
                      const confirmed = confirm("Подтвердите удаление");
                      if (confirmed) {
                        deleteWork(work.id);
                        updateDescription();
                      }
                    }}
                  >
                    Удалить
                  </button>
                </td>
              )}
            </tr>
          );
        })}
        <tr>
          <td></td>
          <td>
            <Input
              type="text"
              size={4}
              value={""}
              label="Все кол-ва"
              onChange={(value: string) =>
                (selectedRepair as Repair).работы.map((work) => {
                  updateWork(work.id, {
                    ...work,
                    количество: value,
                  });
                  updateDescription();
                })
              }
            />
          </td>
          <td colSpan={3}>
            <button
              className="w-full"
              onClick={() => {
                createWork();
                setIsRadioOpen(true);
              }}
            >
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
