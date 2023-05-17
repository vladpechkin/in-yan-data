import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  name: string;
  url?: string;
  entityName?: string;
  setEntityName?: (value: string | null) => void;
}

export const NavItem: FC<Props> = ({
  name,
  url,
  entityName,
  setEntityName,
}) => {
  const router = useRouter();

  const isActive =
    (url === "/" && router.pathname === url) ||
    (url && url !== "/" && router.asPath.includes(url));

  const className = `flex items-center whitespace-nowrap ${
    isActive ? "font-semibold text-black" : ""
  }`;

  const Element = url ? Link : "button";

  return (
    <li>
      <Element
        className={className}
        href={url!}
        onClick={
          setEntityName && entityName
            ? () => setEntityName(entityName)
            : undefined
        }
      >
        {name}
      </Element>
    </li>
  );
};
