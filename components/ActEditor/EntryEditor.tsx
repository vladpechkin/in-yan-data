import { actStates } from "@/consts";
import { productionOptions } from "@/options";
import { ActProps, InputOption, Repair, RepairType } from "@/types";
import {
  getActPrice,
  getRepairTypePrice,
  overwriteAct,
  toOptions,
} from "@/utils";
import { FC } from "react";
import { Data, Row } from "../Equix/Data";
import { Input } from "../Equix/Input";
import { Textarea } from "../Equix/Textarea";
import { Toggle } from "../Equix/Toggle";
import { RepairTable } from "./RepairTable";

interface Props extends ActProps {
  openRepairEditor: (value: RepairType) => void;
  setSelectedRepair: (value: Repair) => void;
}

export const EntryEditor: FC<Props> = ({
  act,
  setAct,
  openRepairEditor,
  setSelectedRepair,
}) => {
  const actPrice = getActPrice(act);
  return (
    <>
      <div className="flex gap-4">
        <section className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">ППР</h3>
          <Textarea
            label="Наряды"
            value={act.ППР.наряды}
            onChange={(value: string) => {
              setAct((prevState) => ({
                ...prevState,
                ППР: {
                  ...prevState.ППР,
                  наряды: value,
                },
              }));
            }}
          />
          <RepairTable
            openRepairEditor={() => openRepairEditor("ППР")}
            setSelectedRepair={setSelectedRepair}
            repairs={act.ППР.ремонты}
            setRepairs={(value) =>
              setAct((prevState) => ({
                ...prevState,
                ППР: { ...prevState.ППР, ремонты: value },
              }))
            }
          />
          <Data label="Итого по ППР" value={getRepairTypePrice(act.ППР)} />
        </section>
        <section className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">ОТР</h3>
          <Textarea
            label="Наряды"
            value={act.ОТР.наряды}
            onChange={(value) => {
              setAct((prevState) => ({
                ...prevState,
                ОТР: {
                  ...prevState.ОТР,
                  наряды: value,
                },
              }));
            }}
          />
          <RepairTable
            openRepairEditor={() => openRepairEditor("ОТР")}
            setSelectedRepair={setSelectedRepair}
            repairs={act.ОТР.ремонты}
            setRepairs={(value) =>
              setAct((prevState) => ({
                ...prevState,
                ОТР: { ...prevState.ОТР, ремонты: value },
              }))
            }
          />
          <Data label="Итого" value={getRepairTypePrice(act.ОТР)} />
        </section>
      </div>
      <section className="flex flex-col gap-2">
        <h3 className="font-semibold">Отчет</h3>
        <div className="flex gap-4 flex-wrap">
          <Input
            label="Отчет. период"
            value={act.отчетныйПериод}
            size={7}
            onChange={(value: string) => {
              setAct((prevState) => ({
                ...prevState,
                отчетныйПериод: value,
              }));
            }}
          />
          <Input
            type="radio"
            label="Состояние"
            options={toOptions(actStates)}
            value={toOptions(actStates).find(
              (option) => option.name === act.состояние
            )}
            minOptions={1}
            onChange={(value: InputOption) => {
              const actState = actStates.find((state) => state === value.name);
              if (actState)
                setAct((prevState) => ({
                  ...prevState,
                  состояние: actState,
                }));
            }}
            isCollapsed={true}
          />
          <Input
            type="radio"
            label="Производство"
            options={productionOptions}
            value={productionOptions.find((option) =>
              option.name.includes(act.производство)
            )}
            minOptions={1}
            onChange={(value: InputOption) =>
              setAct((prevState) => ({
                ...prevState,
                производство: value.name,
              }))
            }
          />
        </div>
        <Input
          label="Примечание"
          value={act.примечание}
          onChange={(value: string) => {
            setAct((prevState) => ({
              ...prevState,
              примечание: value,
            }));
          }}
        />
        <Toggle
          label="Выделить"
          value={act.выделен}
          onChange={(value) =>
            setAct((prevState) => ({
              ...prevState,
              выделен: value,
            }))
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
      {(act.ППР.ремонты.length > 0 || act.ОТР.ремонты.length > 0) && (
        <menu className="flex gap-4 mt-auto">
          <ul>
            <button onClick={() => {}}>Сохранить</button>
          </ul>
          <ul>
            <button onClick={() => overwriteAct(act)}>Печатать</button>
          </ul>
          <ul>
            <button className="text-red-600">Удалить</button>
          </ul>
        </menu>
      )}
    </>
  );
};
