export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbxaGVP4AgwbHA-hWdYhjnrkaujO5dT0AO58zr4EpHTnG1e7VE7Okl8oEnlH60uIusBc/exec",
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
