const express = require("express");
const cors = require("cors");
const { processPayload, getContext } = require("./lib/logic");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid payload. Expected JSON with a 'data' array.",
      });
    }
    const ctx = getContext();
    const result = processPayload(data, ctx);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      is_success: false,
      error: "Internal server error",
    });
  }
});

app.get("/", (_, res) => res.send("BFHL API is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFHL API listening on port ${PORT}`);
});
