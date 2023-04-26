import { Act } from "@/types";
import {
  editCell,
  getActPrice,
  getRepairAmount,
  getRepairDescription,
  getRepairPrice,
  getRepairsPrice,
  getRepairTypePrice,
  sheet_to_aoa,
} from "@/utils";
import { read, utils, WorkSheet } from "xlsx";

// @ts-ignore
import { rubles } from "rubles";

export const overwriteAct = (
  act: Act,
  callback: (header: WorkSheet) => void
) => {
  fetch(`/header.xls`)
    .then((res) => res.arrayBuffer())
    .then((res) => {
      const file = read(new Uint8Array(res), {
        type: "array",
      });
      const header = file.Sheets[file.SheetNames[0]];

      const hasPpr = act.ППР.ремонты.length > 0;
      const hasOtr = act.ОТР.ремонты.length > 0;

      editCell(
        header,
        "B16",
        hasPpr ? `согласно заказа по ППР ${act.ППР.наряды}` : ""
      );
      editCell(
        header,
        "B17",
        hasOtr ? `согласно заказа по О(Т)Р ${act.ОТР.наряды}` : ""
      );

      const pprHeading = `${
        hasOtr ? "Ι. " : ""
      }Планово-предупредительный ремонт`;
      const otrHeading = `${hasPpr ? "ΙΙ. " : ""}Оперативный (текущий) ремонт`;

      editCell(header, "B22", hasPpr ? pprHeading : otrHeading);

      let row = 23;

      if (hasPpr) {
        act.ППР.ремонты.map((repair, index) => {
          editCell(header, `B${row}`, (index + 1).toString());
          editCell(
            header,
            `D${row}`,
            repair.описание || getRepairDescription(repair, "ППР")
          );
          editCell(
            header,
            `U${row}`,
            act.ППР.ремонты[0].работы[0].единицаИзмерения
          );
          editCell(
            header,
            `X${row}`,
            getRepairPrice(repair, "ППР").toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          editCell(header, `Z${row}`, getRepairAmount(repair).toString());
          editCell(
            header,
            `AD${row}`,
            getRepairsPrice(repair, "ППР").toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          row++;
        });
        editCell(
          header,
          `D${row}`,
          `Итого по планово-предупредительному ремонту`
        );
        editCell(
          header,
          `AD${row}`,
          getRepairTypePrice(act.ППР, "ППР").toLocaleString('ru', {style:"currency", currency:"RUB"})
        );
        row++;
      }

      if (hasOtr) {
        editCell(header, `B${row}`, otrHeading);
        row++;

        act.ОТР.ремонты.map((repair, index) => {
          editCell(header, `B${row}`, (index + 1).toString());
          editCell(
            header,
            `D${row}`,
            repair.описание || getRepairDescription(repair, "ОТР")
          );
          editCell(
            header,
            `U${row}`,
            act.ОТР.ремонты[0].работы[0].единицаИзмерения
          );
          editCell(
            header,
            `X${row}`,
            getRepairPrice(repair, "ОТР").toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          editCell(header, `Z${row}`, getRepairAmount(repair).toString());
          editCell(
            header,
            `AD${row}`,
            getRepairsPrice(repair, "ОТР").toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          row++;
        });

        editCell(header, `D${row}`, `Итого по оперативному (текущему) ремонту`);
        editCell(
          header,
          `AD${row}`,
          getRepairTypePrice(act.ОТР, "ОТР").toLocaleString('ru', {style:"currency", currency:"RUB"})
        );
      }

      fetch(`/footer.xls`)
        .then((res) => res.arrayBuffer())
        .then((res) => {
          const file = read(new Uint8Array(res), {
            type: "array",
          });
          const footer = file.Sheets[file.SheetNames[0]];
          editCell(
            footer,
            "A5",
            `Всего к оплате: ${rubles(
              getActPrice(act) * 1.2
            )}, в т.ч. НДС 20% - ${rubles(getActPrice(act) * 0.2)}.`
          );
          editCell(footer, "AD1", getActPrice(act).toLocaleString('ru', {style:"currency", currency:"RUB"}));
          editCell(
            footer,
            "AD2",
            (getActPrice(act) * 0.2).toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          editCell(
            footer,
            "AD3",
            (getActPrice(act) * 1.2).toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          editCell(
            footer,
            "AD4",
            (getActPrice(act) * 1.2).toLocaleString('ru', {style:"currency", currency:"RUB"})
          );
          editCell(footer, "AC1", "");
          editCell(footer, "AC2", "");
          editCell(footer, "AC3", "");
          utils.sheet_add_aoa(header, sheet_to_aoa(footer), { origin: -1 });
          callback(header);
        });
    });
};
