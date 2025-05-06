const mongoose = require("mongoose");
const gameService = require("../services/gameService");

// create a new game
const createGame = async (req, res) => {
  const game = await gameService.createGame(req.body);
  res.status(200).json(game);
};

// update a game
const updateGame = async (req, res) => {
  const { id } = req.params;
  // check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Invalid input: Game ID is not valid" });
  }

  const game = await gameService.updateGame(id, req.body);
  if (!game) {
    return res.status(404).json({ error: "Missing Data: No game found" });
  }

  res.status(200).json(game);
};

// delete a game
const deleteGame = async (req, res) => {
  const { id } = req.params;
  // check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Invalid input: Game ID is not valid" });
  }

  const game = await gameService.deleteGame(id);
  if (!game) {
    return res.status(404).json({ error: "Missing Data: No games found" });
  }

  res.status(200).json(game);
};

// get all games
const getGames = async (req, res) => {
  const games = await gameService.getGames(req.query);
  if (games.length === 0) {
    return res.status(404).json({ error: "Missing Data: Database is empty" });
  }

  res.status(200).json(games);
};

// search/filter games
const searchGames = async (req, res) => {
  const { search } = req.query;
  const games = await gameService.searchGames(search);

  // check if any games were found
  if (games.length === 0) {
    return res.status(404).json({ error: "Missing Data: No games found" });
  }

  res.status(200).json(games);
};

module.exports = {
  createGame,
  getGames,
  searchGames,
  deleteGame,
  updateGame,
};
