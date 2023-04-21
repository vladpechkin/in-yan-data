import { EntryEditor } from "@/components/ActEditor/EntryEditor";
import { RepairEditor } from "@/components/ActEditor/RepairEditor";
import { Layout } from "@/components/Layout";
import { getEmptyAct } from "@/consts";
import { overwriteAct } from "@/overwriteAct";
import { Act } from "@/types";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { utils, writeFile } from "xlsx";
import { useStore } from "../_app";

const Page = observer(() => {
  const {
    acts,
    setSelectedAct,
    setSelectedRepairType,
    selectedAct,
    saveAct,
    deleteAct,
    selectedRepair,
  } = useStore();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && id !== "new") {
      setSelectedAct(acts.find((entity: Act) => entity.id === id));
    } else setSelectedAct(getEmptyAct());
  }, [id, setSelectedAct, acts]);

  return (
    <>
      <Layout className="p-4 flex flex-col gap-4">
        <h2 className="text-xl font-medium">Акт</h2>
        <EntryEditor openRepairEditor={setSelectedRepairType} />
        {(selectedAct.ППР.ремонты.length > 0 ||
          selectedAct.ОТР.ремонты.length > 0) && (
          <menu className="flex gap-4 mt-auto">
            <ul>
              <button
                onClick={() => {
                  saveAct();
                  router.push("/acts");
                }}
              >
                Сохранить
              </button>
            </ul>
            <ul>
              <button
                onClick={() =>
                  overwriteAct(selectedAct, (worksheet) => {
                    const workbook = utils.book_new();
                    utils.book_append_sheet(workbook, worksheet, "Лист 1");
                    writeFile(workbook, "Акт.xls");
                  })
                }
              >
                Печатать
              </button>
            </ul>
            <ul>
              <button
                className="text-red-600"
                onClick={() => {
                  deleteAct();
                  router.push("/acts");
                }}
              >
                Удалить
              </button>
            </ul>
          </menu>
        )}
      </Layout>
      {selectedRepair && <RepairEditor />}
    </>
  );
});

export default Page;
