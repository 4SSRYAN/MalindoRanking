const axios = require("axios");

// Load these from environment variables for security
const API_KEY = process.env.API_KEY;
const GROUP_ID = Number(process.env.GROUP_ID);
const TARGETROLE_BC = Number(process.env.TARGETROLE_BC);

/**
 * Promote a user in the Roblox group
 * @param {number} userId - Roblox UserId to promote
 */
async function promoteUser(userId) {
  try {
    const response = await axios.post(
      `https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${userId}/roles`,
      { roleId: TARGETROLE_BC },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Successfully promoted user ${userId} to role ${TARGETROLE_BC}`);
    return true;
  } catch (error) {
    console.error(
      `Failed to promote user ${userId}:`,
      error.response?.data || error.message
    );
    return false;
  }
}

// Example usage:
// promoteUser(12345678);

module.exports = { promoteUser };
