export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbxCPB-a-zax8tnKxoRMyMBYmb9mSQ1EdEAJg5E5KwVAxxubv593tAaftM9gU2JeWO0q/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
