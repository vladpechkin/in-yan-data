import { overwriteAct } from "@/overwriteAct";
import { useEffect, useState } from "react";
import { utils } from "xlsx";
import { useStore } from "./_app";

const Page = () => {
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzFGhXLh1n98zdinnfF9Q6u-5-TqUjR1Cxo5mnkGwSRpkTHiGMFPTUIROjfotU08KDX/exec",
      {
        redirect: "follow",
        headers: {
          Accept: "application/json",
        },
      }
    ).then((res) => res.json().then(console.log));
  }, []);

  return <div>test</div>;
};

export default Page;
