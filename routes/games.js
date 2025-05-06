const express = require("express");
const {
  createGame,
  getGames,
  searchGames,
  deleteGame,
  updateGame,
} = require("../controllers/gameController");
const validateGame = require("../middlewares/validateGame");

const router = express.Router();

// Add a game (10 points)
router.post("/", validateGame, createGame);

// Edit game details (10 points)
router.patch("/:id", validateGame, updateGame);

// Delete a game (10 points)
router.delete("/:id", deleteGame);

// Retrieve all games (5 points)
router.get("/", getGames);

// Search/filter games (5 points)
router.get("/search", searchGames);

module.exports = router;
