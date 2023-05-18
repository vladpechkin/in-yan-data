import { ElementType, FC, ReactNode } from "react";

export interface BaseInputProps {
  type?:
    | "text"
    | "checkbox"
    | "radio"
    | "date"
    | "time"
    | "tel"
    | "email"
    | "search";
  label?: string;
  errorMessage?: string;
  className?: string;
  autoFocus?: boolean;
}

interface ComponentProps {
  as?: ElementType;
  className?: string;
  errorMessage?: string;
  children: ReactNode;
}

export const InputBase: FC<ComponentProps> = ({
  as = "label",
  className,
  children,
  errorMessage,
}) => {
  const Element = as;
  return (
    <Element className={`flex flex-col max-w-screen-sm ${className || ""}`}>
      {children}
      {errorMessage && <span className="text-red-600">{errorMessage}</span>}
    </Element>
  );
};
