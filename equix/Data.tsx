import { FC } from "react";

interface Props {
  label: string;
  value: string | number | null | undefined;
}

export const Data: FC<Props> = ({ label, value }) =>
  value ? (
    <label className="flex flex-col">
      <span className="font-medium">{label}</span>
      {value.toString()}
    </label>
  ) : null;

export const Row = (
  props: { label: string; value: string | number | null | undefined }[]
) =>
  props.length > 0 && props.find((x) => !!x) ? (
    <div className="flex gap-4 flex-wrap">
      {props.map((prop, index) => (
        <Data key={index} label={prop.label} value={prop.value} />
      ))}
    </div>
  ) : null;
