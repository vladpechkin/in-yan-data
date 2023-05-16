import { getEmptyWork, measurementUnits } from "@/consts";
import { useStore } from "@/pages/_app";
import { InputOption, Repair, Work } from "@/types";
import {
  getRepairDescription,
  getRepairPrice,
  getWorks,
  toOptions,
} from "@/utils";
import { observer } from "mobx-react";
import { Input } from "@/equix/Input";

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

  const workOptions = toOptions(
    getWorks(selectedRepairType).map(
      (work: Work) => `${work["№ п.п."]} ${work["Содержание работ"]}`
    )
  );

  const updateDescription = () =>
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType),
    });

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
        {(selectedRepair as Repair).работы.map((work, index) => (
          <tr key={index}>
            <td>
              <Input
                type="radio"
                options={workOptions}
                value={workOptions.find((option) =>
                  work["Содержание работ"].includes(option.name)
                )}
                isCollapsed
                onChange={(value: InputOption) => {
                  updateWork(work.id, {
                    ...work,
                    "Содержание работ": value.name,
                    цена: getWorks(selectedRepairType).find((work) =>
                      selectedRepairType === "ППР"
                        ? getWorks(selectedRepairType).find((work: Work) =>
                            value.name.includes(work["Содержание работ"])
                          )["Стоимость"]
                        : work["Содержание работ"]
                            .replaceAll(/[0-9]/g, "")
                            .replaceAll(" ", "") ===
                          value.name
                            .replaceAll(/[0-9]/g, "")
                            .replaceAll(" ", "")
                    )["Стоимость"],
                  });
                  updateDescription();
                }}
              />
            </td>
            <td className="w-20">
              <Input
                type="text"
                size={4}
                value={work.количество.toString()}
                onChange={(value: string) => {
                  updateWork(work.id, {
                    ...work,
                    количество: parseInt(value),
                  });
                  updateDescription();
                }}
              />
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
        ))}
        <tr>
          <td colSpan={100}>
            <button className="w-full" onClick={() => createWork()}>
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
