const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Load sensitive info from environment variables
const API_KEY = process.env.API_KEY;
const GROUP_ID = Number(process.env.GROUP_ID);
const TARGETROLE_BC = Number(process.env.TARGETROLE_BC); // use your exact env var name

app.post("/promote", async (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res.status(400).send("Missing UserId");
  }

  try {
    await axios.post(
      `https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${UserId}/roles`,
      { roleId: TARGETROLE_BC },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Promoted user ${UserId} to role ${TARGETROLE_BC}`);
    res.status(200).send("Promotion successful");
  } catch (error) {
    console.error("Promotion error:", error.response?.data || error.message);
    res.status(500).send("Promotion failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
