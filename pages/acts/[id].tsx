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

  // useEffect(() => {
  //   console.log(act);
  // }, [act]);

  const replaceArrItem = (
    items: any[],
    id: string,
    itemAttributes?: object
  ) => {
    var index = items.findIndex((x) => x.id === id);
    return [
      ...items.slice(0, index),
      ...(itemAttributes
        ? [Object.assign({}, items[index], itemAttributes)]
        : []),
      ...items.slice(index + 1),
    ];
  };

  const replaceRepair = (id: string, newRepair: Repair) =>
    setAct((prevState) => {
      console.log("hui", {
        ...prevState,
        ППР: {
          ...prevState.ППР,
          ремонты: prevState.ППР.ремонты.map((x) =>
            x.id === id ? newRepair : x
          ),
        },
      });
      return {
        ...prevState,
        ППР: {
          ...prevState.ППР,
          ремонты: prevState.ППР.ремонты.map((x) =>
            x.id === id ? newRepair : x
          ),
        },
      };
    });

  const replaceRepairObject = (newObject?: RepairObject) =>
    setAct((prevState) => ({
      ...prevState,
      ППР: {
        ...prevState.ППР,
        ремонты: [
          ...prevState.ППР.ремонты.filter(
            (repair) => repair.id !== selectedRepair?.id
          ),
          {
            ...selectedRepair!,
            объектыРемонта: [
              ...selectedRepair!.объектыРемонта,
              ...(newObject ? [newObject] : []),
            ],
          },
        ],
      },
    }));

  const setRepairObjects = (newRepairObjects: RepairObject[]) =>
    setAct((prevState) => ({
      ...prevState,
      ППР: {
        ...prevState.ППР,
        ремонты: [
          ...prevState.ППР.ремонты.filter(
            (repair) => repair.id !== selectedRepair?.id
          ),
          {
            ...selectedRepair!,
            объектыРемонта: newRepairObjects,
          },
        ],
      },
    }));

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
            setRepairObjects={setRepairObjects}
          />
        </Dialog>
      )}
    </>
  );
};

export default Page;
