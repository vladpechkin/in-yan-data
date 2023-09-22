export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbzSMLlxIXpTx_8DrNWbkg8igJ_VF_ZW6VMcrQJDHqUzudtTy01Fz_ESnt_zNlTwOgxy/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
