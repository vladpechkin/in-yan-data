import { FC } from "react";

interface Props {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: FC<Props> = ({ label, value, onChange }) => (
  <label className="flex gap-2 cursor-pointer">
    <input type="checkbox" checked={value} onChange={() => onChange(!value)} />
    {label}
  </label>
);
