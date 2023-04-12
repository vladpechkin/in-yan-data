import { getEmptyWork, measurementUnits } from "@/consts";
import { InputOption, RepairType, Work } from "@/types";
import { getWorks, toOptions } from "@/utils";
import { FC } from "react";
import { Input } from "../Equix/Input";

interface Props {
  works: Work[];
  setWorks: (value: Work[]) => void;
  type: RepairType;
}

export const WorkTable: FC<Props> = ({ type, works, setWorks }) => {
  const workOptions = toOptions(
    getWorks(type).map((work: any) => work["Содержание работ"])
  );
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
          <th>Действия</th>
        </tr>
        {works.map((work, index) => (
          <tr key={index}>
            <td>
              <Input
                type="radio"
                options={workOptions}
                value={workOptions.find((option) =>
                  work["Содержание работ"].includes(option.name)
                )}
                isCollapsed
                onChange={(value: InputOption) =>
                  setWorks(
                    works
                      .filter(({ id }) => id !== work.id)
                      .concat({
                        ...work,
                        "Содержание работ": value.name,
                      })
                  )
                }
              />
            </td>
            <td className="w-20">
              {type === "ППР" ? (
                "1"
              ) : (
                <Input
                  type="text"
                  size={4}
                  value={work.количество.toString()}
                  onChange={(value: string) =>
                    setWorks(
                      works
                        .filter(({ id }) => id !== work.id)
                        .concat({ ...work, количество: parseInt(value) })
                    )
                  }
                />
              )}
            </td>
            <td className="w-16">
              {type === "ППР" ? (
                "шт."
              ) : (
                <Input type="radio" options={toOptions(measurementUnits)} />
              )}
            </td>

            <td className="w-20">
              <button
                className="text-red-600 w-full text-center"
                onClick={() => {
                  setWorks(works.filter(({ id }) => id !== work.id));
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
              onClick={() => setWorks(works.concat(getEmptyWork()))}
            >
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
