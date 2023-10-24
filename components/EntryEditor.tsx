import { actStates } from "@/consts";
import { DateInput } from "@/equix/Input/Date";
import { productionOptions } from "@/options";
import { useStore } from "@/pages/_app";
import { InputOption, RepairType } from "@/types";
import { capitalize, getActSum, getRepairTypePrice, renderInt, toOptions } from "@/utils";
import { observer } from "mobx-react";
import { FC } from "react";
import { Input } from "../equix/Input";
import { Textarea } from "../equix/Textarea";
import { Toggle } from "../equix/Toggle";
import { RepairTable } from "./RepairTable";
// @ts-ignore
import { rubles } from "rubles";

interface Props {
  openRepairEditor: (value: RepairType) => void;
}

export const EntryEditor: FC<Props> = observer(({ openRepairEditor }) => {
  const { selectedAct, setSelectedAct } = useStore();
  const actPrice = getActSum(selectedAct);
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
          <span>Итого: {renderInt(getRepairTypePrice(selectedAct.ППР))}</span>
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
          <span>Итого: {renderInt(getRepairTypePrice(selectedAct.ОТР))}</span>
        </section>
      </div>
      <div>
        <div>Итого: {renderInt(actPrice)}</div>
        <div>НДС: {renderInt(actPrice * 0.2)}</div>
        <div>Итого с НДС: {renderInt(actPrice * 1.2)}</div>
        <div>Всего к оплате: {rubles(actPrice * 1.2)}</div>
      </div>
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
    </>
  );
});
