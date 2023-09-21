export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbzCZwfNH-T-aRYLJ149_Z_HngOogK9c8Eqaw-e-qLFmAjJRjZ3QRN93HoT3lJ_9wVQK/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
