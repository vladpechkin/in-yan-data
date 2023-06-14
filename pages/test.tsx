import { overwriteAct } from "@/overwriteAct";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { utils } from "xlsx";
import { useStore } from "./_app";

const Page = () => {
  useEffect(() => {
    // fetch(
    //   "https://script.google.com/macros/s/AKfycbzFGhXLh1n98zdinnfF9Q6u-5-TqUjR1Cxo5mnkGwSRpkTHiGMFPTUIROjfotU08KDX/exec",
    //   {
    //     redirect: "follow",
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }
    // ).then((res) => res.json().then(console.log));
    fetch("/prices-otr.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(
          Object.fromEntries(
            (res as any).map((obj) => [
              `${Object.values(obj)[0]} ${Object.keys(obj)[1]}`,
              Object.values(obj)[1],
            ])
          )
        );
      });
  }, []);

  return <div>test</div>;
};

export default Page;
