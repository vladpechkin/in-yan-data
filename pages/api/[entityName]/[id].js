import fsPromises from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  let {entityName, id} = req.query;
  if (entityName !== "acts") id = +id;
  const dataFilePath = path.join(process.cwd(), `/public/${entityName}.json`);
  try {
    switch (req.method) {
      case "GET": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);
        res.status(200).json(objectData.find((x) => x.id === id));
        break;
      }
      case "PUT": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);      
        const body = req.body;
        if (Object.keys(body).length === 0) {
          res.status(411);
          return;
        }
        objectData = objectData.map((x) => (x.id === id ? body : x));
        console.log(objectData);
        await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData)); 
        res.status(200).json("PUT");
        break;
      }
      case "DELETE": {
        const fileData = await fsPromises.readFile(dataFilePath);
        let objectData = JSON.parse(fileData);
        const updatedData = JSON.stringify(
          objectData.filter((x) => x.id !== id)
        );
        await fsPromises.writeFile(dataFilePath, updatedData);
        res.status(200).json("DELETED");
        break;
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
