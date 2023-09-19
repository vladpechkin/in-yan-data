export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbz8cYlJEMJs1H82pr9JnvKKPsk5kepZx8XAInIOPQDsiVVaKw-5D6uwkbzKmIj0hkiK/exec",
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
