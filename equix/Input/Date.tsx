import { FC } from "react";
import { InputBase } from "./Base";
import { TextProps } from "./Text";

export interface DateProps extends TextProps {
  options?: Intl.DateTimeFormatOptions;
}

export const DateInput: FC<DateProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <InputBase className="relative cursor-pointer">
    {label && <span>{label}</span>}
    {new Date(value).toLocaleDateString("ru", options)}
    <button className="self-start">Календарь</button>
    <input
      type="date"
      value={value}
      className="w-full h-full text-[100px] absolute top-0 left-0 opacity-0"
      onChange={({ target }) => onChange(target.value)}
    />
  </InputBase>
);
