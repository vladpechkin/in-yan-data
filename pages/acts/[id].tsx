import { EntryEditor } from "@/components/EntryEditor";
import { RepairEditor } from "@/components/RepairEditor";
import { getEmptyAct } from "@/consts";
import { Layout } from "@/equix/Layout";
import { getActPrice, getRepairPrice } from "@/utils";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../_app";

// @ts-ignore
import { rubles } from "rubles";
import { Repair } from "@/types";

const Page = observer(() => {
  const {
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
      fetch(`/api/acts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res && res?.json())
        .then(setSelectedAct);
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
                  router.reload();
                  router.push("/acts");
                }}
              >
                Записать изменения
              </button>
            </ul>
            <ul>
              <button
                onClick={() =>
                  fetch("/api/sheet", {
                    method: "POST",
                    body: JSON.stringify({
                      ...selectedAct,
                      price: getActPrice(selectedAct),
                      priceRub: rubles(
                        getActPrice(selectedAct) * 1.2
                      ).toLocaleString("ru"),
                      ndsRub: rubles(getActPrice(selectedAct) * 0.2),
                      pprPrice: (selectedAct.ППР.ремонты as Repair[])
                        .map((r) => r.сумма)
                        .reduce((partialSum, a) => partialSum + a, 0),
                      otrPrice: (selectedAct.ОТР.ремонты as Repair[])
                        .map((r) => r.сумма)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    }),
                  }).then(
                    () => {}
                    // window.open(
                    //   "https://docs.google.com/spreadsheets/d/1nPNJ8RBplCF3UBPwGANsISG1F1xTRWMcvgEZqkeHkNQ/edit?usp=sharing",
                    //   "_blank"
                    // )
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
