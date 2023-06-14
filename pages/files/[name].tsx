import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { Layout } from "../../equix/Layout";

const Page = () => {
  const [html, setHtml] = useState("");
  const router = useRouter();

  const { name } = router.query;

  useEffect(() => {
    if (name)
      fetch(`/${name}`)
        .then((res) => res.arrayBuffer())
        .then((res) => {
          const file = read(new Uint8Array(res), {
            type: "array",
          });
          const worksheet = file.Sheets[file.SheetNames[0]];
          setHtml(utils.sheet_to_html(worksheet));
        });
  }, [name]);

  return (
    <Layout>
      <span dangerouslySetInnerHTML={{ __html: html }}></span>
    </Layout>
  );
};

export default Page;
