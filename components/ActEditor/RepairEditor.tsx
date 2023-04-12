import { areaOptions } from "@/options";
import { InputOption, Repair, RepairObject, RepairType } from "@/types";
import { getRepairDescription, getRepairPrice } from "@/utils";
import { FC, useEffect } from "react";
import { Row } from "../Equix/Data";
import { Input } from "../Equix/Input";
import { Textarea } from "../Equix/Textarea";
import { RepairObjectTable } from "./RepairObjectTable";
import { ShiftTable } from "./ShiftTable";
import { WorkTable } from "./WorkTable";

interface Props {
  type: RepairType;
  replaceRepair: (id: string, value: Repair) => void;
  repair: Repair;

  setRepairObjects: (value: RepairObject[]) => void;
  replaceRepairObject: (value?: RepairObject) => void;
}

export const RepairEditor: FC<Props> = ({
  type,
  repair,
  replaceRepair,
  replaceRepairObject,
  setRepairObjects,
}) => {
  useEffect(() => {
    replaceRepair(repair.id, {
      ...repair,
      описание: getRepairDescription(repair, type),
    });
  }, [
    repair.доля,
    repair.зона,
    repair.объектыРемонта,
    repair.работы,
    repair.смены,
  ]);

  return (
    <>
      <div className="flex gap-4">
        <Input
          type="radio"
          label="Зона"
          isCollapsed
          options={areaOptions}
          value={areaOptions.find((option) => option.name === repair.зона)}
          onChange={(value: InputOption) => {
            console.log(repair);
            replaceRepair(repair.id, { ...repair, зона: value.name });
          }}
        />
        <Input
          label="Доля пр-ва, %"
          size={2}
          className="self-start"
          value={repair.доля.toString()}
          onChange={(value: string) =>
            replaceRepair(repair.id, { ...repair, доля: parseInt(value) })
          }
        />
      </div>
      <RepairObjectTable
        repairObjects={repair.объектыРемонта}
        replaceRepairObject={replaceRepairObject}
        setRepairObjects={setRepairObjects}
      />
      <ShiftTable
        shifts={repair.смены}
        setShifts={(shifts) =>
          replaceRepair(repair.id, { ...repair, смены: shifts })
        }
      />
      <WorkTable
        works={repair.работы}
        setWorks={(works) =>
          replaceRepair(repair.id, { ...repair, работы: works })
        }
        type={type}
      />
      <Textarea
        label="Описание ремонта"
        className="h-40"
        value={repair.описание}
        onChange={(value: string) =>
          replaceRepair(repair.id, { ...repair, описание: value })
        }
      />
      <Row
        {...[
          {
            label: "Кол-во оборудования",
            value: repair.объектыРемонта?.map((объектРемонта) =>
              объектРемонта?.оборудование?.map((оборудование) => оборудование)
            ).length,
          },
          { label: "Итого по работам", value: getRepairPrice(repair) },
        ]}
      />
    </>
  );
};
