import { EntryEditor } from "@/components/EntryEditor";
import { RepairEditor } from "@/components/RepairEditor";
import { getEmptyAct } from "@/consts";
import { Layout } from "@/equix/Layout";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "../_app";

const Page = observer(() => {
  const {
    setSelectedAct,
    setSelectedRepairType,
    selectedAct,
    saveAct,
    deleteAct,
    selectedRepair,
    writeAct,
  } = useStore();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && id !== "new") {
      fetch(`/acts.json`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res?.json())
        .then((res) => setSelectedAct(res.find((act: any) => act.id === id)));
    } else setSelectedAct(getEmptyAct());
  }, [id, setSelectedAct]);

  const [disabled, setDisabled] = useState(false);

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
                type="button"
                disabled={disabled}
                onClick={async () => {
                  setDisabled(true);
                  await saveAct(router.asPath.includes("new") ? "POST" : "PUT");
                  setDisabled(false);

                  router.push("/acts");
                }}
              >
                Записать изменения
              </button>
            </ul>

            <ul>
              <button
                type="button"
                disabled={disabled}
                onClick={async () => {
                  setDisabled(true);
                  await writeAct();
                  setDisabled(false);

                  window.open(
                    "https://docs.google.com/spreadsheets/d/1S5nOSGna-covY3ZokHB0VkHwpo6Ybj17Q-jY9XkPpKY/edit#gid=305857577",
                    "_blank",
                  );
                }}
              >
                Открыть файл
              </button>
            </ul>

            <ul>
              <button
                type="button"
                disabled={disabled}
                className="text-red-600"
                onClick={async () => {
                  if (confirm("Подтвердите удаление")) {
                    setDisabled(true);
                    await deleteAct();
                    setDisabled(false);

                    router.push("/acts");
                  }
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
