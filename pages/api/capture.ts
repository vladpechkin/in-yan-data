import { readFileSync, writeFileSync } from "fs";
import { NextApiHandler } from "next";
import { join } from "path";

const handler: NextApiHandler = (req, res) => {
  if (req.method === "POST") {
    const errorsJsonPath = join(process.cwd(), "/public/errors.json");
    const errors = JSON.parse(readFileSync(errorsJsonPath).toString("utf-8"));

    errors[new Date().toLocaleString("ru-RU")] = req.body;
    writeFileSync(errorsJsonPath, JSON.stringify(errors));

    res.status(204).end();
  }
};

export default handler;
