import { InputOption } from "@/types";
import { FC, useState } from "react";
import { Input } from ".";
import { Dialog } from "../Dialog";
import { BaseInputProps, InputBase } from "./Base";

type OnChange = (value: InputOption) => void;

type NullableOnChange = (value: InputOption | null) => void;

export interface RadioProps extends BaseInputProps {
  minOptions?: number;
  options: InputOption[];
  value?: InputOption;
  onChange: OnChange | NullableOnChange;
  isCollapsed?: boolean;
  isDialogOpen?: boolean;
}

export const Radio: FC<RadioProps> = ({
  label,
  minOptions = 0,
  options,
  value = null,
  onChange,
  className,
  isDialogOpen = false,
  isCollapsed = options?.length > 5 ? true : false,
}) => {
  const handleChange = (option: InputOption) => {
    if (minOptions === 1 && value?.id === option.id) return;

    // @ts-ignore
    onChange(value?.id === option.id ? null : option);

    if (isOpen) setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const [searchQuery, setSearchQuery] = useState("");

  const renderOptions = (options: InputOption[]) => (
    <div className="flex flex-col">
      {options?.length > 0 ? (
        options.map((option, index) => (
          <label
            key={index}
            className="flex gap-2 w-full cursor-pointer"
            onClick={() => handleChange(option)}
          >
            <input
              type="radio"
              checked={value?.id === option.id}
              onChange={() => {}}
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
            <span className={value ? "" : "text-gray-400"}>
              {value?.name || "Не выбрано"}
            </span>
            <button className="self-start" onClick={() => setIsOpen(true)}>
              Выбрать
            </button>
          </>
        ) : (
          <div className="flex flex-col border border-blue-500 col-1">
            {renderOptions(options)}
          </div>
        )}
      </InputBase>
      <Dialog title={label!} isOpen={isOpen} close={() => setIsOpen(false)}>
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
            option?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
          )
        )}
      </Dialog>
    </>
  );
};
