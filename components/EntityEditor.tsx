import { Dialog } from "@/equix/Dialog";
import { Input } from "@/equix/Input";
import { areEntitiesEqual } from "@/utils";
import { FC } from "react";

interface Props {
  indexToEdit: number | null;
  setChangedEntity: (object: any) => void;
  entityTemplate: any;
  setIndexToEdit: (index: number | null) => void;
  entityKeys: string[];
  changedEntity: any;
  entities: Object[];
  entity: Object;
  setEntities: (object: Object[]) => void;
}

export const EntityEditor: FC<Props> = ({
  indexToEdit,
  setChangedEntity,
  entityTemplate,
  setIndexToEdit,
  entityKeys,
  changedEntity,
  entities,
  entity,
  setEntities,
}) => {
  let changedValue: any = {};

  const filteredEntities = entities.filter((_, index) => index !== indexToEdit);

  return (
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
          key={index}
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
                const confirmed = confirm("Подтвердите удаление");
                if (confirmed) {
                  setEntities(filteredEntities);
                  setChangedEntity(entityTemplate);
                  setIndexToEdit(null);
                }
              }}
            >
              Удалить
            </button>
          </li>
        )}
      </menu>
    </Dialog>
  );
};
