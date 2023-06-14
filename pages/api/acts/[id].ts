import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/public/acts.json");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);

        const { id } = req.query;

        res.status(200).json(objectData.find((x) => x.id === id));
      }
      case "PUT": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);

        const { id } = req.query;
        const body = JSON.parse(req.body);

        objectData = objectData.map((x) => (x.id === id ? body : x));

        await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData));
        res.status(200).json("PUT");
      }
      case "DELETE": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);

        const { id } = req.query;

        const updatedData = JSON.stringify(
          objectData.filter((x) => x.id !== id)
        );

        await fsPromises.writeFile(dataFilePath, updatedData);

        res.status(200).json("DELETED");
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
