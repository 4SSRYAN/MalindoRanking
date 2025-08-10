const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;
const GROUP_ID = Number(process.env.GROUP_ID);
const TARGET_ROLE_ID = Number(process.env.TARGETROLE_BC);

app.post("/promote", async (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    console.log("[Promote] Missing UserId in request body");
    return res.status(400).send("Missing UserId");
  }

  console.log(`[Promote] Attempting to promote UserId: ${UserId} to role ${TARGET_ROLE_ID} in group ${GROUP_ID}`);

  try {
    const response = await axios.post(
      `https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${UserId}/roles`,
      { roleId: TARGET_ROLE_ID },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[Promote] Roblox API response status: ${response.status}`);
    console.log(`[Promote] Roblox API response data:`, response.data);

    res.status(200).send("Promotion successful");
  } catch (error) {
    console.error("[Promote] Promotion error status:", error.response?.status);
    console.error("[Promote] Promotion error data:", error.response?.data);
    console.error("[Promote] Full error:", error.message);
    res.status(500).send("Promotion failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
