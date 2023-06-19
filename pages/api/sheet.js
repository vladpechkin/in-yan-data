export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbwBi1nOaA5frOb99pEzUcS83uvkBwtSdU-Dj4bHKtiq4CyelT1PbfPX-dkjnuluGYhE/exec",
      {
        method: "POST",
        body: req.body,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    res.status(200).json(result.body);
  } catch (error) {
    res.status(500).json(error);
  }
}
