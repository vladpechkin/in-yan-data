import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/public/acts.json");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST": {
        const fileData = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(fileData);

        const body = req.body;

        objectData.push(body);

        const updatedData = JSON.stringify(objectData);

        await fsPromises.writeFile(dataFilePath, updatedData);
        res.status(200).json("POSTED");
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
