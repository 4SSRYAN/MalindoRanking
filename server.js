const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Map your roles (lowercase) to their Roblox role IDs
const ROLE_MAP = {
  businessclass: 92111032,
  economyclass: 82297264,
  partnerrepresentatives: 92111037,
  investors: 92111042,
  lowrank: 92111068,
  mediumrank: 92111081,
  highrank: 92111089,
  seniorhighrank: 92111099,
  founder: 82297262,
  holder: 82297261,
};

// Your group ID and API key from env
const API_KEY = process.env.API_KEY;
const GROUP_ID = Number(process.env.GROUP_ID);

app.post("/promote/:roleName", async (req, res) => {
  const roleName = req.params.roleName.toLowerCase();
  const { UserId } = req.body;

  if (!UserId) {
    console.log("[Promote] Missing UserId in request body");
    return res.status(400).send("Missing UserId");
  }

  if (!ROLE_MAP[roleName]) {
    console.log("[Promote] Invalid role name:", roleName);
    return res.status(400).send("Invalid role name");
  }

  const TARGET_ROLE_ID = ROLE_MAP[roleName];

  console.log(`[Promote] Attempting to promote UserId: ${UserId} to role ${roleName} (ID: ${TARGET_ROLE_ID}) in group ${GROUP_ID}`);

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
