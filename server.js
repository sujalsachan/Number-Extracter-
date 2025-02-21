import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const extractNum = (str) => {
  return str.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
};

app.get("/", (req, res) => {
  res.send("API is running");
});

app.post("/extract-numbers", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) { 
    return res.status(400).json({
      error: "Invalid input, expected an array inside 'data'",
    });
  }

  const result = data.map((obj) => extractNum(obj.text));

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`The Server is running on port ${PORT}`);
});
