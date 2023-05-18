import { overwriteAct } from "@/overwriteAct";
import { useEffect, useState } from "react";
import { utils } from "xlsx";
import { useStore } from "./_app";

const Page = () => {
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxAa5fNUeSo1DxuFHPUvPEl8PNei_hdYftE7q_E3ESUNzq2oZQPIGSXeThR3RjYgBKv/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa("pechkinde@gmail.com" + ":" + "H4shb4ng.."),
        },
      }
    );
  }, []);

  return <div>test</div>;
};

export default Page;
