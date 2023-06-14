import { useRouter } from "next/router";
import { Layout } from "../equix/Layout";

export const ErrorPage = () => {
  const router = useRouter();

  return (
    <Layout className="items-center justify-center flex flex-gap gap-2">
      <h2 className="font-semibold">Произошла ошибка</h2>
      <button onClick={() => router.reload()}>Перезагрузить страницу</button>
      <button onClick={() => router.push("/acts")}>Вернуться на главную</button>
    </Layout>
  );
};
