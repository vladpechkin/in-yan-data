import { Dialog } from "@/equix/Dialog";
import { Input } from "@/equix/Input";
import { getChangeableKeys } from "@/utils";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { EntityEditor } from "./EntityEditor";

interface Props {
  entityName: string | null;
  title: string;
  setEntityName: (value: string | null) => void;
}

export const EntitiesEditor: FC<Props> = ({
  title,
  entityName,
  setEntityName,
}) => {
  const router = useRouter();

  const [entities, setEntities] = useState<Object[]>([]);
  const [idToEdit, setIdToEdit] = useState<number | null>(null);

  const changeableKeys = entityName && getChangeableKeys(entityName as string);

  const entityKeys = changeableKeys
    ? changeableKeys
    : entities[0]
    ? Object.keys(entities[0])
    : [];

  const [entity, setEntity] = useState<Object>({});

  const entityTemplate = Object.fromEntries(entityKeys.map((key) => [key, ""]));

  const [changedEntity, setChangedEntity] = useState<any>({});

  useEffect(() => {
    if (entityName)
      fetch(`/${entityName}.json`)
        .then((res) => res.json())
        .then((res) => setEntities(res));
  }, [router, entityName]);

  useEffect(() => {
    if (typeof idToEdit === "number" && idToEdit < entities.length) {
      // @ts-ignore
      setEntity(entities.find(entity => entity.id === idToEdit));
      setChangedEntity(entities[idToEdit]);
    }
  }, [idToEdit, entities]);

  const [searchQuery, setSearchQuery] = useState("");

  const getEntities = () =>
    entities?.filter((entity) =>
      Object.values(entity).find((value) =>
        value?.toString().includes(searchQuery)
      )
    );

  return (
    <Dialog
      isOpen={!!entityName}
      close={() => {
        setEntityName(null);
      }}
      title={title}
    >
      {entities && entities[0] && (
        <>
          <Input
            value={searchQuery}
            onChange={setSearchQuery}
            type="search"
            label="Поиск"
            autoFocus
          />
          <table>
            <thead>
              <tr>
                <td colSpan={100}>
                  <button
                    className="w-full"
                    onClick={() => {
                      setEntity(entityTemplate);
                      setIdToEdit(entities.length);
                    }}
                  >
                    Добавить
                  </button>
                </td>
              </tr>
              <tr>
                {entityKeys.map((key, index) => (
                  <td key={index}>{key === "id" ? "№" : key}</td>
                ))}
                <td>Действия</td>
              </tr>
            </thead>
            <tbody>
              {entityKeys && getEntities().length > 0 ? (
                getEntities()
                  // @ts-ignore
                  .sort(({ id: idA }, { id: idB }) => idA - idB)
                  .map((entity, entityIndex) => (
                    <tr key={entityIndex}>
                      {entityKeys.map((key, index) => (
                        // @ts-ignore
                        <td key={index}>{entity[key]}</td>
                      ))}
                      <td>
                        <button
                          onClick={() => {
                            setChangedEntity(entityTemplate);
                            // @ts-ignore
                            setIdToEdit(entity.id - 3);
                          }}
                        >
                          Изменить
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <span className="text-gray-400">Ничего не найдено</span>
              )}
            </tbody>
          </table>
        </>
      )}
      {entityName && (
        <EntityEditor
          indexToEdit={idToEdit}
          setChangedEntity={setChangedEntity}
          entityTemplate={entityTemplate}
          setIndexToEdit={setIdToEdit}
          entityKeys={entityKeys}
          changedEntity={changedEntity}
          entities={entities}
          entity={entity}
          setEntities={setEntities}
          entityName={entityName}
        />
      )}
    </Dialog>
  );
};
