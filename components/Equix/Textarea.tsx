import { FC } from "react";
import { InputBase } from "./Input/Base";
import { TextProps } from "./Input/Text";

export const Textarea: FC<TextProps> = ({
  value,
  onChange,
  label,
  className,
}) => (
  <InputBase as="label">
    {label && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
    <textarea
      className={`flex items-center border border-blue-500 px-2 py-1 min-h-[2.5rem] ${
        className || ""
      }`}
      value={value}
      onChange={({ target }) => onChange(target.value)}
    ></textarea>
  </InputBase>
);
