import { Input } from "@/components/Equix/Input";
import { Dialog } from "@/components/Equix/Dialog";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { areEntitiesEqual, getChangeableKeys } from "@/utils";

const Page = () => {
  const router = useRouter();
  const { entityName } = router.query;

  const [entities, setEntities] = useState<Object[]>([]);
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);

  const changeableKeys = entityName && getChangeableKeys(entityName as string);

  const entityKeys = changeableKeys
    ? changeableKeys
    : entities[0]
    ? Object.keys(entities[0])
    : [];

  const [entity, setEntity] = useState<Object>({});

  const entityTemplate = Object.fromEntries(entityKeys.map((key) => [key, ""]));

  const [changedEntity, setChangedEntity] = useState<any>({});

  let changedValue: any = {};

  const filteredEntities = entities.filter(
    (entity, index) => index !== indexToEdit
  );

  useEffect(() => {
    if (entityName)
      fetch(`/${entityName}.json`)
        .then((res) => res.json())
        .then((res) => setEntities(res));
  }, [router, entityName]);

  useEffect(() => {
    if (typeof indexToEdit === "number" && indexToEdit < entities.length) {
      setEntity(entities[indexToEdit]);
      setChangedEntity(entities[indexToEdit]);
    }
  }, [indexToEdit, entities]);

  return (
    <Layout>
      {entities && entities[0] && (
        <table>
          <thead>
            <tr>
              {entityKeys.map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entities &&
              entityKeys &&
              entities
                // .sort((a, b) =>
                //   a[entityKeys[0]]
                //     .toString()
                //     .localeCompare(b[entityKeys[0].toString()])
                // )
                .map((entity, entityIndex) => (
                  <tr key={entityIndex}>
                    {Object.values(entity).map((value, index) => (
                      <td
                        key={index}
                        onClick={() => {
                          setChangedEntity(entityTemplate);
                          setIndexToEdit(entityIndex);
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={100}>
                <button
                  className="w-full"
                  onClick={() => {
                    setEntity(entityTemplate);
                    setIndexToEdit(entities.length);
                  }}
                >
                  Добавить
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
      <Dialog
        isOpen={typeof indexToEdit === "number"}
        close={() => {
          setChangedEntity(entityTemplate);
          setIndexToEdit(null);
        }}
        title="Редактировать"
      >
        {entityKeys.map((key, index) => (
          <Input
            label={key}
            key={key}
            value={changedEntity[key]}
            onChange={(value: any) => {
              changedValue[key] = value;
              setChangedEntity((prevState: any) => ({
                ...prevState,
                ...changedValue,
              }));
            }}
          />
        ))}
        <menu className="flex gap-4">
          {!areEntitiesEqual(entity, changedEntity) && (
            <li>
              <button
                onClick={() => {
                  setEntities([...filteredEntities, changedEntity]);
                  setChangedEntity(entityTemplate);
                  setIndexToEdit(null);
                }}
              >
                Сохранить
              </button>
            </li>
          )}
          {entity && (
            <li>
              <button
                className="text-red-600"
                onClick={() => {
                  setEntities(filteredEntities);
                  setChangedEntity(entityTemplate);
                  setIndexToEdit(null);
                }}
              >
                Удалить
              </button>
            </li>
          )}
        </menu>
      </Dialog>
    </Layout>
  );
};

export default Page;
