export default async function handler(req, res) {
  fetch(
    "https://script.google.com/macros/s/AKfycbwHFmLkJHbA3xFhK0iJBgMyC55Mx3-oQg6JebFSijqHIUqamxTDv9j81uOX8C7sp8R-/exec",
    {
      method: "POST",
      body: req.body,
    }
  )
    .then((res) => res.text())
    .then(console.log);
  res.status(200).json("Executed");
}
