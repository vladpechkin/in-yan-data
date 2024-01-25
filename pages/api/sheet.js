export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  if ("ППР" in body && "ремонты" in body.ППР)
    for (const ремонт of body.ППР.ремонты) {
      const { доля } = ремонт;

      if ("работы" in ремонт)
        for (const работа of ремонт.работы) {
          работа.цена = (работа.цена / 100) * доля;
        }
    }

  await fetch(
    "https://script.google.com/macros/s/AKfycbwHFmLkJHbA3xFhK0iJBgMyC55Mx3-oQg6JebFSijqHIUqamxTDv9j81uOX8C7sp8R-/exec",
    { method: "POST", body: JSON.stringify(body) },
  );

  res.status(200).json("Executed");
}
