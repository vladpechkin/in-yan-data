import { getEmptyRepair } from "@/consts";
import { Repair } from "@/types";
import { getRepairPrice } from "@/utils";
import { FC } from "react";

interface Props {
  repairs: Repair[];
  setRepairs: (value: Repair[]) => void;
  openRepairEditor: () => void;
  setSelectedRepair: (value: Repair) => void;
}

export const RepairTable: FC<Props> = ({
  repairs,
  setRepairs,
  openRepairEditor,
  setSelectedRepair,
}) => (
  <table className="w-full">
    <tbody>
      <tr>
        <th colSpan={100}>Ремонты</th>
      </tr>
      {repairs.length > 0 && (
        <tr>
          <th>№</th>
          <th>Наименование работ</th>
          <th>Ед. изм.</th>
          <th>Кол-во</th>
          <th>Сумма</th>
          <th>Действия</th>
        </tr>
      )}
      {repairs.length > 0 ? (
        repairs.map((repair, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {repair.работы.map((work) => work["Содержание работ"]).join(", ")}
            </td>
            <td>{repair.работы[0].единицаИзмерения}</td>
            <td>
              {repair.объектыРемонта.map((obj) => obj.оборудование).length}
            </td>
            <td>{getRepairPrice(repair)}</td>
            <td>
              <button
                onClick={() => {
                  setSelectedRepair(repair);
                  openRepairEditor();
                }}
              >
                Изменить
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={100} className="text-center text-gray-400">
            Ничего нет
          </td>
        </tr>
      )}
      <tr>
        <td colSpan={100}>
          <button
            className="w-full"
            onClick={() => {
              const newRepair = getEmptyRepair();
              setRepairs(repairs.concat(newRepair));
              setSelectedRepair(newRepair);
              openRepairEditor();
            }}
          >
            Добавить
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);
