export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbwyRhDB3st9I71SXgTywZhT-r_tBiFwOEzW2v8CjaCzoGEAvAlxBfnKmxYTsOoo4Mqn/exec",
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
