export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbzKRtBDSD1Ki-uVj9kzD9ANFDcDAvRVnh9kNbkAINm3zCKMMAYQfpv9u75KC3eJe69O/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
