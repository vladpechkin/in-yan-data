import { EntryEditor } from "@/components/EntryEditor";
import { RepairEditor } from "@/components/RepairEditor";
import { getEmptyAct } from "@/consts";
import { Layout } from "@/equix/Layout";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../_app";

const Page = observer(() => {
  const {
    setSelectedAct,
    setSelectedRepairType,
    selectedAct,
    saveAct,
    deleteAct,
    selectedRepair,
    writeAct
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
        .then(res => setSelectedAct(res.find((act: any) => act.id === id)));
    } else setSelectedAct(getEmptyAct());
  }, [id, setSelectedAct]);

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
                    saveAct(router.asPath.includes("new") ? "POST" : "PUT");
                    router.push("/acts/");
                    router.reload()
                  }}
                >
                  Записать изменения
                </button>
              </ul>
              <ul>
                <button
                  onClick={() =>
                    writeAct()
                    .then(() =>
                      window.open(
                        'https://docs.google.com/spreadsheets/d/1S5nOSGna-covY3ZokHB0VkHwpo6Ybj17Q-jY9XkPpKY/edit#gid=305857577',
                        "_blank"
                      )
                    )
                  }
                >
                  Открыть файл
                </button>
              </ul>
              <ul>
                <button
                  className="text-red-600"
                  onClick={() => {
                    const confirmed = confirm("Подтвердите удаление");
                    if (confirmed) {
                      deleteAct();
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
