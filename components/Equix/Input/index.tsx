import { FC } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { DateInput, DateProps } from "./Date";
import { Radio, RadioProps } from "./Radio";
import { TextInput, TextProps } from "./Text";

export const Input: FC<RadioProps | CheckboxProps | DateProps | TextProps> = (
  props
) =>
  props.type === "checkbox" ? (
    <Checkbox {...(props as CheckboxProps)} />
  ) : props.type === "radio" ? (
    <Radio {...(props as RadioProps)} />
  ) : props.type === "date" ? (
    <DateInput {...(props as DateProps)} />
  ) : (
    <TextInput {...(props as TextProps)} />
  );
