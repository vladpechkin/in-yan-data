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
    comment
  } = useStore();

  const workOptions = toOptions(Object.keys(getWorks(selectedRepairType)));

  const updateDescription = () =>
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType, comment),
    });

  const [isRadioOpen, setIsRadioOpen] = useState(false);
  const [allAmounts, setAllAmounts] = useState("");

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th colSpan={100}>Проведенные работы</th>
        </tr>
        <tr>
          <td>Тип работы</td>
          <td>Кол-во</td>
          <td>Ед. изм.</td>
          <td>Цена</td>
          {(selectedRepair as Repair).работы.length > 1 && <td>Действия</td>}
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
                {selectedRepairType === "ППР" ? (
                  work.количество
                ) : (
                  <Input
                    type="text"
                    size={4}
                    value={work.количество}
                    onChange={(value: string) => {
                      updateWork(work.id, {
                        ...work,
                        количество: value,
                      });
                      updateDescription();
                    }}
                  />
                )}
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
              value={allAmounts}
              label="Все кол-ва"
              onChange={(value: string) => {
                setAllAmounts(value);
                (selectedRepair as Repair).работы.map((work) => {
                  updateWork(work.id, {
                    ...work,
                    количество: value,
                  });
                  updateDescription();
                });
              }}
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
