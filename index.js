const express = require("express");
const twilio = require("twilio");

const app = express();

// ✅ THIS IS THE IMPORTANT PART
app.use(express.urlencoded({ extended: false }));

app.post("/webhook", (req, res) => {
  const incomingMsg = req.body.Body;

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(`You said: ${incomingMsg}`);

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
