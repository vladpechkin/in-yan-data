export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbznIvGmB_eDkCa8ijMkl7haFH-Ld_sBgikmCdcUL5umfb3TFt4qVP3Ds5swcLmlYLyW/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
