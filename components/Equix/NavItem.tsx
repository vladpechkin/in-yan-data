import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  name: string;
  url: string;
}

export const NavItem: FC<Props> = ({ name, url }) => {
  const router = useRouter();

  const isActive =
    (url === "/" && router.pathname === url) ||
    (url !== "/" && router.asPath.includes(url));

  return (
    <li>
      <Link
        className={`flex items-center whitespace-nowrap ${
          isActive ? "font-semibold text-black" : ""
        }`}
        href={url}
      >
        {name}
      </Link>
    </li>
  );
};
