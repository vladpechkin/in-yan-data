import { employeeOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, Repair } from "@/types";
import { observer } from "mobx-react";
import { Input } from "../Equix/Input";

export const ShiftTable = observer(() => {
  const { selectedRepair, createShift, deleteShift, updateShift } = useStore();

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <th colSpan={100}>Смены</th>
        </tr>
        <tr>
          <th>Дата</th>
          <th>Сотрудники</th>
          <th>Действия</th>
        </tr>
        {(selectedRepair as Repair).смены.map((shift, index) => (
          <tr key={index}>
            <td className="w-20">
              <Input
                type="date"
                withLabels={false}
                value={shift.дата}
                onChange={(value: Date) =>
                  updateShift(shift.id, {
                    ...shift,
                    дата: value,
                  })
                }
              />
            </td>
            <td>
              <Input
                type="checkbox"
                options={employeeOptions}
                value={employeeOptions.filter((option) =>
                  shift.сотрудники.includes(option.name)
                )}
                onChange={(value: InputOption[]) =>
                  updateShift(shift.id, {
                    ...shift,
                    сотрудники: value.map(({ name }) => name),
                  })
                }
                isCollapsed
              />
            </td>
            <td className="w-20">
              <button
                className="text-red-600 w-full text-center"
                onClick={() => {
                  deleteShift(shift.id);
                }}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={100}>
            <button className="w-full" onClick={() => createShift()}>
              Добавить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
