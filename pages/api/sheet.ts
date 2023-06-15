export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycby76waSKjL4VRLkqqVBDAUoCGDCsu5NplyA0Hdu-3E4fV7DNJJwGAwjJLXEHtHCQe4Q/exec",
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
