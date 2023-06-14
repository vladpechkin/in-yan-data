import { Act } from "@/types";
import { getActPrice, getRepairTypePrice } from "@/utils";
import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../equix/Layout";
import { useStore } from "../_app";

const Page = observer(() => {
  const [acts, setActs] = useState([]);
  const { events } = useRouter();

  const getData = () =>
    fetch("/acts.json")
      .then((res) => res.json())
      .then(setActs);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    events.on("routeChangeComplete", () => {
      getData();
    });
  }, [events]);

  return (
    <Layout>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-16">Отчетный период</th>
            <th>Производство</th>
            <th>Сумма ППР</th>
            <th>Сумма ОТР</th>
            <th>Итого</th>
            <th>НДС</th>
            <th>Итого с НДС</th>
            <th>Состояние</th>
            <th>Примечание</th>
            <th className="w-16">Действия</th>
          </tr>
        </thead>
        <tbody>
          {acts.length > 0 &&
            acts.map((act: Act, index: number) => {
              const actPrice = getActPrice(act);
              return (
                <tr key={index} className={act.выделен ? "bg-blue-100" : ""}>
                  <td>{act.отчетныйПериод}</td>
                  <td>{act.производство}</td>
                  <td>{getRepairTypePrice(act.ППР, "ППР")}</td>
                  <td>{getRepairTypePrice(act.ОТР, "ОТР")}</td>
                  <td>{actPrice}</td>
                  <td>{actPrice * 0.2}</td>
                  <td>{actPrice * 1.2}</td>
                  <td>{act.состояние}</td>
                  <td>{act.примечание}</td>
                  <td>
                    <Link href={`/acts/${act.id}`}>Изменить</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={100}>
              <Link
                className="flex items-center w-full justify-center"
                href="/acts/new"
              >
                Добавить
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </Layout>
  );
});

export default Page;
