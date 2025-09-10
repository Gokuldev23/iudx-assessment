const axios = require("axios");

const verifyKeycloakToken = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    console.log({authHeader})
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.slice(7);
    const keycloakUrl = process.env.KEYCLOAK_URL || "http://localhost:8080";
    console.log({keycloakUrl})
    const realm = process.env.KEYCLOAK_REALM || "my-app";

    const { data } = await axios.get(
      `${keycloakUrl}/realms/${realm}/protocol/openid-connect/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    req.user = data;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyKeycloakToken;
