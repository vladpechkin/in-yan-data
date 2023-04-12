import { getEmptyShift } from "@/consts";
import { employeeOptions } from "@/options";
import { InputOption, Shift } from "@/types";
import { FC } from "react";
import { Input } from "../Equix/Input";

interface Props {
  shifts: Shift[];
  setShifts: (value: Shift[]) => void;
}

export const ShiftTable: FC<Props> = ({ shifts, setShifts }) => (
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
      {shifts.map((shift, index) => (
        <tr key={index}>
          <td className="w-20">
            <Input
              type="date"
              withLabels={false}
              value={shift.дата}
              onChange={(value: Date) =>
                setShifts(
                  shifts
                    .filter((oldShift) => oldShift.id !== shift.id)
                    .concat({
                      ...shift,
                      дата: value,
                    })
                )
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
                setShifts(
                  shifts
                    .filter(({ id }) => id !== shift.id)
                    .concat({
                      ...shift,
                      сотрудники: value.map(({ name }) => name),
                    })
                )
              }
              isCollapsed
            />
          </td>
          <td className="w-20">
            <button
              className="text-red-600 w-full text-center"
              onClick={() => {
                setShifts(shifts.filter(({ id }) => id !== shift.id));
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
            onClick={() => setShifts(shifts.concat(getEmptyShift()))}
          >
            Добавить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);
