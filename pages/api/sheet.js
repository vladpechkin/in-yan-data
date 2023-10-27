export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbwcBnuLm9JEYPV38XQiyvZ9bgGz-aN0fiTcavojnxHtVN4ZWx9EkqxA-_RLv0A3SSJX/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
