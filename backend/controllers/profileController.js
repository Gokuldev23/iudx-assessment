// Just returns Keycloak user info (no DB needed)
const getProfile = (req, res) => {
  res.json({
    id: req.user.sub,
    username: req.user.preferred_username,
    email: req.user.email,
  });
};

module.exports = { getProfile };
