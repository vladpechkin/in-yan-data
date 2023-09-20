import { Act, Repair } from "@/types";
import { getActPrice, getRepairTypePrice } from "@/utils";
import { observer } from "mobx-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../equix/Layout";

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
            <td className="w-16">Отчетный период</td>
            <td>Производство</td>
            <td>Сумма ППР</td>
            <td>Сумма ОТР</td>
            <td>Итого</td>
            <td>НДС</td>
            <td>Итого с НДС</td>
            <td>Состояние</td>
            <td>Примечание</td>
            <td className="w-16">Действия</td>
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
                  <td>{getRepairTypePrice(act.ППР)}</td>
                  <td>
                    {(act.ОТР.ремонты as Repair[])
                      .map((r) => r.сумма)
                      .reduce((partialSum, a) => partialSum + a, 0)}
                  </td>
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
