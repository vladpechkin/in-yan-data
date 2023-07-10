export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbzZzwYFwxg4Lcij_RMbFxCabU0vnmvbhNJ4vaUe1A5bkg12zKo5jnaCcYgmQ6zPtdXN/exec",
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
