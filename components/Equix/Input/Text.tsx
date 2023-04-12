import { FC } from "react";
import { BaseInputProps, InputBase } from "./Base";

export interface TextProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  size?: number;
}

export const TextInput: FC<TextProps> = ({
  label,
  value,
  onChange,
  className,
  type,
  autoFocus,
  size,
}) => (
  <InputBase as="label">
    {label && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
    <input
      value={value}
      type={type}
      className={`flex items-center border border-blue-500 px-2 py-1 h-8 ${
        className || ""
      }`}
      size={size}
      onChange={({ target }) => onChange(target.value)}
      autoFocus={autoFocus}
    />
  </InputBase>
);
