const validateGameData = require("../utils/validators");

const validateGame = (req, res, next) => {
  const error = validateGameData(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  next();
};

module.exports = validateGame;