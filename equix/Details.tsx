import { FC, ReactNode, useState } from "react";

interface Props {
  summary: string;
  children: ReactNode;
  open?: boolean;
}

export const Details: FC<Props> = ({ summary, children, open = false }) => {
  const [isOpen, setOpen] = useState(open);
  return (
    <details
      open={isOpen ? true : undefined}
      onClick={(e) => e.preventDefault()}
      className="w-full"
    >
      <summary
        className="whitespace-nowrap list-none cursor-pointer flex items-center gap-2 justify-between mb-2 w-full"
        onClick={() => setOpen(!isOpen)}
      >
        {summary} <i className={`bi bi-chevron-${isOpen ? "up" : "down"}`}></i>
      </summary>
      {children}
    </details>
  );
};
