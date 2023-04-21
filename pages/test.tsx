import { overwriteAct } from "@/overwriteAct";
import { useState } from "react";
import { utils } from "xlsx";
import { useStore } from "./_app";

const Page = () => {
  const { acts } = useStore();

  const [html, setHtml] = useState("");

  overwriteAct(acts[0], (header) => setHtml(utils.sheet_to_html(header)));

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Page;
