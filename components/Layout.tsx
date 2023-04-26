import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { Details } from "../equix/Details";
import { Logo } from "./Logo";
import { NavItem } from "../equix/NavItem";

const routes = [
  { name: "Акты", url: "/acts" },
  // {
  //   name: "По производствам",
  //   url: "/files/otchet-po-proizvodstvam.xls",
  //   group: "Отчеты",
  // },
  // {
  //   name: "По сотрудникам",
  //   url: "/files/otchet-po-sotrudnikam.xls",
  //   group: "Отчеты",
  // },
  // {
  //   name: "По мастерам",
  //   url: "/files/otchet-po-masteram.xls",
  //   group: "Отчеты",
  // },
  { name: "Производства", url: "/database/productions", group: "Справочники" },
  { name: "Корпуса", url: "/database/buildings", group: "Справочники" },
  { name: "Сотрудники", url: "/database/employees", group: "Справочники" },
  { name: "Мастера", url: "/database/masters", group: "Справочники" },
  { name: "ППР", url: "/files/prejskurant-ppr.xls", group: "Прейскуранты" },
  { name: "ОТР", url: "/files/prejskurant-otr.xls", group: "Прейскуранты" },
];

interface Props {
  children: ReactNode;
  className?: string;
}

export const Layout: FC<Props> = ({ children, className }) => {
  const groups = [...new Set(routes.map((route) => route.group))].filter(
    (x) => !!x
  );

  const router = useRouter();

  useEffect(() => {
    router.pathname === "/404" && router.push("/acts");
  }, [router]);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-200 gap-px">
      <nav className="flex gap-4 flex-col bg-white px-8 py-4 w-64 overflow-y-auto">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="flex flex-col gap-4">
          {routes.map(
            (route) => !route.group && <NavItem key={route.name} {...route} />
          )}
          {groups.map((group) => (
            <li key={group} className="w-full">
              <Details summary={group as string} open>
                <ul className="flex flex-col gap-2">
                  {routes.map(
                    (route) =>
                      route.group &&
                      route.group === group && (
                        <NavItem key={route.name} {...route} />
                      )
                  )}
                </ul>
              </Details>
            </li>
          ))}
        </ul>
      </nav>
      <main
        className={`bg-white flex flex-col overflow-auto h-full w-full ${
          className || ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};
