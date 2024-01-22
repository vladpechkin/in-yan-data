import { Dialog } from "@/equix/Dialog";
import { Input } from "@/equix/Input";
import { areaOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption } from "@/types";
import { getRepairDescription, getRepairPrice } from "@/utils";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
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
    selectedAct,
    setSelectedAct,
    getSelectedRepair,
  } = useStore();

  const [доля, установитьДолю] = useState(selectedRepair.доля.toString());

  useEffect(() => {
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType),
    });
  }, [доля]);

  return (
    <Dialog
      title="Ремонт"
      isOpen={!!selectedRepairType}
      close={() => setSelectedRepairType(null)}
      className="w-full h-full gap-8"
    >
      <div className="flex gap-4">
        <Input
          type="radio"
          label="Зона"
          isCollapsed
          options={areaOptions}
          value={areaOptions.find(
            (option) => option.name === selectedRepair.зона,
          )}
          onChange={(value: InputOption) =>
            setSelectedRepair({ зона: value.name })
          }
        />
        <Input
          label="Доля пр-ва, %"
          size={3}
          className="self-start"
          value={доля}
          onChange={(value: string) => {
            value =
              value
                .trim()
                .match(/(,|\.|\d)/g)
                ?.join("") || "";

            установитьДолю(value);
            setSelectedRepair({ доля: parseFloat(value.replace(/,/g, ".")) });
          }}
        />
      </div>
      {selectedRepair.зона && <RepairObjectTable />}
      {selectedRepair.объектыРемонта[0].оборудование.length > 0 && (
        <>
          <ShiftTable />
          <WorkTable />
        </>
      )}
      {selectedRepair.работы[0]["Содержание работ"] && selectedRepair.описание}
      <menu className="flex gap-4 mt-auto">
        <ul>
          <button
            onClick={() => {
              setSelectedRepair({
                сумма: getRepairPrice(selectedRepair),
              });
              selectedRepairType
                ? setSelectedAct({
                    ППР: {
                      ...selectedAct.ППР,
                      стоимость: getRepairPrice(selectedRepair),
                    },
                  })
                : setSelectedAct({
                    ОТР: {
                      ...selectedAct.ОТР,
                      стоимость: getRepairPrice(selectedRepair),
                    },
                  });
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
              const confirmed = confirm("Подтвердите удаление");
              if (confirmed) {
                deleteRepair(selectedRepair.id);
                setSelectedRepairType(null);
                setSelectedRepair(null);
              }
            }}
          >
            Удалить
          </button>
        </ul>
      </menu>
    </Dialog>
  );
});
