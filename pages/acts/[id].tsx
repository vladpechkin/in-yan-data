import { EntryEditor } from "@/components/ActEditor/EntryEditor";
import { RepairEditor } from "@/components/ActEditor/RepairEditor";
import { Dialog } from "@/components/Equix/Dialog";
import { Layout } from "@/components/Layout";
import { getEmptyAct } from "@/consts";
import { Act, Repair, RepairObject, RepairType } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const [act, setAct] = useState(getEmptyAct());
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id && id !== "new")
      fetch("/acts.json")
        .then((res) => res.json())
        .then((data) => setAct(data.find((entity: Act) => entity.id === id)));
  }, [id]);

  const [selectedRepairType, setSelectedRepairType] =
    useState<RepairType | null>(null);

  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);

  useEffect(() => {
    console.log(act);
  }, [act]);

  const replaceRepair = (id: string, newRepair?: Repair) =>
    setAct((prevState) => {
      if (newRepair) {
        const index = prevState.ППР.ремонты.findIndex((x) => x.id === id);
        Object.assign(prevState.ППР.ремонты[index], newRepair);
        return {
          ...prevState,
        };
      } else
        return {
          ...prevState,
          ППР: {
            ...prevState.ППР,
            ремонты: prevState.ППР.ремонты.filter((x) => x.id !== id),
          },
        };
    });

  const replaceRepairObject = (id: string, newObject: RepairObject) => {
    if (selectedRepair) {
      const index = selectedRepair?.объектыРемонта.findIndex(
        (x) => x.id === id
      );
      Object.assign(selectedRepair?.объектыРемонта[index], newObject);
      replaceRepair(selectedRepair.id, selectedRepair);
    }
  };

  const replaceRepairObjects = (newRepairObjects: RepairObject[]) =>
    selectedRepair &&
    replaceRepair(selectedRepair.id, {
      ...selectedRepair!,
      объектыРемонта: newRepairObjects,
    });

  return (
    <>
      <Layout className="p-4 flex flex-col gap-4">
        <h2 className="text-xl font-medium">Акт</h2>
        <EntryEditor
          openRepairEditor={setSelectedRepairType}
          setSelectedRepair={setSelectedRepair}
          act={act}
          setAct={setAct}
        />
      </Layout>
      {selectedRepair && (
        <Dialog
          title="Ремонт"
          isOpen={!!selectedRepairType}
          close={() => setSelectedRepairType(null)}
          className="w-full h-full"
        >
          <RepairEditor
            type={selectedRepairType!}
            repair={selectedRepair}
            replaceRepair={replaceRepair}
            replaceRepairObject={replaceRepairObject}
            setRepairObjects={replaceRepairObjects}
          />
        </Dialog>
      )}
    </>
  );
};

export default Page;
