export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbweufX7Z4n3y-uvLQOBhTJrQD1Vy6eZr1p1VVlak8JEOIUlrudI2NQ2_s06upAmyJCZ/exec",
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
