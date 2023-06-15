import { actStates } from "@/consts";
import { DateInput } from "@/equix/Input/Date";
import { productionOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, RepairType } from "@/types";
import { getActPrice, toOptions } from "@/utils";
import { observer } from "mobx-react";
import { FC } from "react";
import { Data, Row } from "../equix/Data";
import { Input } from "../equix/Input";
import { Textarea } from "../equix/Textarea";
import { Toggle } from "../equix/Toggle";
import { RepairTable } from "./RepairTable";

interface Props {
  openRepairEditor: (value: RepairType) => void;
}

export const EntryEditor: FC<Props> = observer(({ openRepairEditor }) => {
  const { selectedAct, setSelectedAct } = useStore();
  const actPrice = getActPrice(selectedAct);
  return (
    <>
      <div className="flex gap-4">
        <section className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">ППР</h3>
          <Textarea
            label="Наряды"
            value={selectedAct.ППР.наряды}
            onChange={(value: string) =>
              setSelectedAct({
                ППР: {
                  ...selectedAct.ППР,
                  наряды: value,
                },
              })
            }
          />
          <RepairTable
            openRepairEditor={() => openRepairEditor("ППР")}
            type="ППР"
            setRepairs={(value) => {
              setSelectedAct({
                ППР: {
                  ...selectedAct.ППР,
                  ремонты: value,
                },
              });
            }}
          />
          <Data label="Итого по ППР" value={selectedAct.ППР.стоимость} />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">ОТР</h3>
          <Textarea
            label="Наряды"
            value={selectedAct.ОТР.наряды}
            onChange={(value) => {
              setSelectedAct({
                ОТР: {
                  ...selectedAct.ОТР,
                  наряды: value,
                },
              });
            }}
          />
          <RepairTable
            openRepairEditor={() => openRepairEditor("ОТР")}
            type="ОТР"
            setRepairs={(value) =>
              setSelectedAct({
                ОТР: {
                  ...selectedAct.ОТР,
                  ремонты: value,
                },
              })
            }
          />
          <Data label="Итого по ОТР" value={selectedAct.ОТР.стоимость} />
        </section>
      </div>
      <section className="flex flex-col gap-2">
        <h3 className="font-semibold">Отчет</h3>
        <div className="flex gap-4 flex-wrap">
          <DateInput
            label="Отчет. период"
            onChange={(value) =>
              setSelectedAct({
                отчетныйПериод: value,
              })
            }
            value={selectedAct.отчетныйПериод}
            options={{
              month: "2-digit",
              year: "numeric",
            }}
          />
          <Input
            type="radio"
            label="Состояние"
            options={toOptions(actStates)}
            value={toOptions(actStates).find(
              (option) => option.name === selectedAct.состояние
            )}
            minOptions={1}
            onChange={(value: InputOption) => {
              const actState = actStates.find((state) => state === value.name);
              if (actState) {
                setSelectedAct({
                  состояние: actState,
                });
              }
            }}
            isCollapsed={true}
          />
          <Input
            type="radio"
            label="Производство"
            options={productionOptions}
            value={
              selectedAct.производство
                ? productionOptions.find((option) =>
                    option.name.includes(selectedAct.производство)
                  )
                : undefined
            }
            minOptions={1}
            onChange={(value: InputOption) =>
              setSelectedAct({
                производство: value.name,
              })
            }
          />
        </div>
        <Input
          label="Примечание"
          value={selectedAct.примечание}
          onChange={(value: string) =>
            setSelectedAct({
              примечание: value,
            })
          }
        />
        <Toggle
          label="Выделить"
          value={selectedAct.выделен}
          onChange={(value) =>
            setSelectedAct({
              выделен: value,
            })
          }
        />
      </section>
      <Row
        {...[
          { label: "Итого", value: actPrice },
          { label: "НДС (20%)", value: actPrice * 0.2 },
          { label: "Итого с НДС", value: actPrice * 1.2 },
        ]}
      />
    </>
  );
});
