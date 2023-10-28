import { InputOption } from "@/types";
import { FC, useState } from "react";
import { Input } from ".";
import { Dialog } from "../Dialog";
import { InputBase } from "./Base";
import { RadioProps } from "./Radio";

export interface CheckboxProps extends Omit<RadioProps, "value" | "onChange"> {
  maxOptions?: number;
  value?: InputOption[];
  onChange: (value: InputOption[]) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  minOptions = 0,
  maxOptions,
  options,
  value = [],
  onChange,
  className,
  isCollapsed,
}) => {
  const handleChange = (option: InputOption) => {
    if (maxOptions && value.length === maxOptions) return;

    const alreadySelectedOption = value.find(({ id }) => id === option.id);

    if (alreadySelectedOption) {
      if (minOptions === 1 && value.length === 1) return;
      onChange(value.filter(({ id }) => id !== option.id));
    } else onChange([...new Set([...value, option])]);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const renderOptions = (options: InputOption[]) => (
    <div className="flex flex-col">
      {options?.length > 0 ? (
        options.map((option, index) => (
          <label key={option.id} className="flex gap-2 cursor-pointer w-full">
            <input
              type="checkbox"
              checked={value?.map(({ id }) => id).includes(option.id)}
              onChange={() => handleChange(option)}
            />
            {option.name}
          </label>
        ))
      ) : (
        <span className="text-gray-400">Ничего не найдено</span>
      )}
    </div>
  );

  return (
    <>
      <InputBase as="fieldset" className={className}>
        {label && <legend>{label}</legend>}
        {isCollapsed ? (
          <>
            <span className={value.length > 0 ? "" : "text-gray-400"}>
              {value.length > 0
                ? value.map((option) => option.name).join(", ")
                : "Не выбрано"}
            </span>
            <button
              className="self-start"
              onClick={() => setIsDialogOpen(true)}
            >
              {value.length > 0 ? "Изменить" : "Выбрать"}
            </button>
          </>
        ) : (
          <div className="flex flex-col border border-blue-500 col-1">
            {renderOptions(options)}
          </div>
        )}
      </InputBase>
      <Dialog
        title={label!}
        isOpen={isDialogOpen}
        close={() => setIsDialogOpen(false)}
      >
        {options.length > 10 && (
          <Input
            type="search"
            label="Поиск"
            value={searchQuery}
            onChange={setSearchQuery}
            autoFocus
          />
        )}
        {renderOptions(
          options?.filter((option) =>
            option?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
          )
        )}
      </Dialog>
    </>
  );
};
