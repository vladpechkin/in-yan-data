import { areaOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, Work } from "@/types";
import {
  getRepairAmount,
  getRepairDescription,
  getRepairPrice,
  getWorkNames,
} from "@/utils";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Row } from "@/equix/Data";
import { Dialog } from "@/equix/Dialog";
import { Input } from "@/equix/Input";
import { Textarea } from "@/equix/Textarea";
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

  useEffect(() => {
    setSelectedRepair({
      описание: getRepairDescription(selectedRepair, selectedRepairType),
    });
  }, []);

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
      {selectedRepair.зона && <RepairObjectTable />}
      {selectedRepair.объектыРемонта[0].оборудование.length > 0 && (
        <>
          <ShiftTable />
          <WorkTable />
        </>
      )}
      {selectedRepair.работы[0]["Содержание работ"] && (
        <Textarea
          label="Описание ремонта"
          className="h-40"
          value={selectedRepair.описание}
          onChange={(value: string) => setSelectedRepair({ описание: value })}
        />
      )}
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
              let selectedRepairPrice = 0;
              getSelectedRepair().работы.map((work: Work) => {
                selectedRepairPrice += getWorkNames(selectedRepairType).find(
                  (pricelistWork) =>
                    pricelistWork["Содержание работ"]
                      .replaceAll(/[0-9]/g, "")
                      .replaceAll(" ", "") ===
                    work["Содержание работ"]
                      .replaceAll(/[0-9]/g, "")
                      .replaceAll(" ", "")
                )["Стоимость"];
              });
              setSelectedRepair({
                сумма: selectedRepairPrice,
              });
              selectedRepairType
                ? setSelectedAct({
                    ППР: {
                      ...selectedAct.ППР,
                      стоимость: getRepairPrice(
                        selectedRepair,
                        selectedRepairType
                      ),
                    },
                  })
                : setSelectedAct({
                    ОТР: {
                      ...selectedAct.ОТР,
                      стоимость: getRepairPrice(
                        selectedRepair,
                        selectedRepairType
                      ),
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
