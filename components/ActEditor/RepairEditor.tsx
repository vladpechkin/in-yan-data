import { areaOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption } from "@/types";
import { getRepairAmount, getRepairDescription, getRepairPrice } from "@/utils";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Row } from "../Equix/Data";
import { Dialog } from "../Equix/Dialog";
import { Input } from "../Equix/Input";
import { Textarea } from "../Equix/Textarea";
import { RepairObjectTable } from "./RepairObjectTable";
import { ShiftTable } from "./ShiftTable";
import { WorkTable } from "./WorkTable";

export const RepairEditor = observer(() => {
  const {
    selectedRepair,
    setSelectedRepair,
    selectedRepairType,
    saveRepair,
    deleteRepair,
    setSelectedRepairType,
  } = useStore();

  useEffect(() => {
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType),
    });
  }, []);

  const router = useRouter();

  return (
    <Dialog
      title="Ремонт"
      isOpen={!!selectedRepairType}
      close={() => setSelectedRepairType(null)}
      className="w-full h-full"
    >
      <div className="flex gap-4">
        <Input
          type="radio"
          label="Зона"
          isCollapsed
          options={areaOptions}
          value={areaOptions.find(
            (option) => option.name === selectedRepair.зона
          )}
          onChange={(value: InputOption) =>
            setSelectedRepair({ зона: value.name })
          }
        />
        <Input
          label="Доля пр-ва, %"
          size={2}
          className="self-start"
          value={selectedRepair.доля.toString()}
          onChange={(value: string) =>
            setSelectedRepair({ доля: parseInt(value) })
          }
        />
      </div>
      <RepairObjectTable />
      <ShiftTable />
      <WorkTable />
      <Textarea
        label="Описание ремонта"
        className="h-40"
        value={selectedRepair.описание}
        onChange={(value: string) => setSelectedRepair({ описание: value })}
      />
      <Row
        {...[
          {
            label: "Кол-во оборудования",
            value: getRepairAmount(selectedRepair),
          },
          {
            label: "Итого по работам",
            value: getRepairPrice(selectedRepair, selectedRepairType),
          },
        ]}
      />
      <menu className="flex gap-4 mt-auto">
        <ul>
          <button
            onClick={() => {
              saveRepair();
              setSelectedRepairType(null);
            }}
          >
            Сохранить
          </button>
        </ul>
        <ul>
          <button
            className="text-red-600"
            onClick={() => {
              deleteRepair();
              setSelectedRepairType(null);
              setSelectedRepair(null);
            }}
          >
            Удалить
          </button>
        </ul>
      </menu>
    </Dialog>
  );
});
