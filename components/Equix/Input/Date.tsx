import { getMonthLength } from "@/utils";
import { FC, useEffect, useState } from "react";
import { InputBase } from "./Base";
import { TextInput, TextProps } from "./Text";

export interface DateProps extends Omit<TextProps, "value" | "onChange"> {
  format?: string[];
  minDate?: Date;
  maxDate?: Date;
  value: Date | string | null;
  withLabels?: boolean;
  onChange: (value: Date) => void;
}

export const DateInput: FC<DateProps> = ({
  label,
  format = ["day", "month", "year"],
  className,
  onChange,
  value,
  withLabels = true,
}) => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const date = new Date();
  useEffect(() => {
    if (value) {
      console.log(value);
      const a = new Date(value);
      setDay(a.getDate().toString());
      setMonth(a.getMonth().toString());
      setYear(a.getFullYear().toString());
    }
  }, []);

  const getErrorMessage = () => {
    if (day === "" || month === "" || year === "") return undefined;

    if (parseInt(day) > getMonthLength(parseInt(month), parseInt(year)))
      return "Неверный день";
    if (parseInt(month) > 12) return "Неверный месяц";
  };

  return (
    <InputBase
      as="fieldset"
      className={className}
      errorMessage={getErrorMessage()}
    >
      {label && <span>{label}</span>}
      <div className="flex items-end">
        {format.includes("day") && (
          <>
            <TextInput
              label={withLabels ? "День" : undefined}
              value={day}
              onChange={(value) => {
                if (value.length <= 2) {
                  setDay(value);
                  date.setDate(parseInt(day));
                  onChange(date);
                }
              }}
              className="w-9"
            />
            <span>.</span>
          </>
        )}
        {format.includes("month") && (
          <>
            <TextInput
              label={withLabels ? "Мес." : undefined}
              value={month}
              onChange={(value) => {
                if (value.length <= 2) {
                  setMonth(value);
                  date.setMonth(parseInt(month));
                  onChange(date);
                }
              }}
              className="w-9"
            />
            <span>.</span>
          </>
        )}
        {format.includes("year") && (
          <TextInput
            label={withLabels ? "Год" : undefined}
            value={year}
            onChange={(value) => {
              if (value.length <= 4) {
                setYear(value);
                date.setFullYear(parseInt(year));
                onChange(date);
              }
            }}
            className="w-[52px]"
          />
        )}
      </div>
    </InputBase>
  );
};
