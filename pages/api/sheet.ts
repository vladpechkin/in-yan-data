export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbybZ10qBgny6s-JBl0Ee2u5vU-YIN3I-HMU3sqrErJfeDRfz7J_mChQCt6bsTBE9FCG/exec",
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
