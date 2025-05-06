const Game = require("../models/gameModel");

const createGame = async (data) => {
  return await Game.create(data);
};

const updateGame = async (id, data) => {
  return await Game.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteGame = async (id) => {
  return await Game.findOneAndDelete({ _id: id });
};

const getGames = async (query) => {
  const { page = 1, limit = 10 } = query;
  return await Game.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
};

const searchGames = async (search) => {
  return await Game.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { genre: { $regex: search, $options: "i" } },
      { platform: { $regex: search, $options: "i" } },
    ],
  }).sort({ createdAt: -1 });
};

module.exports = { createGame, updateGame, deleteGame, getGames, searchGames };
