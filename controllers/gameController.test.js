const request = require("supertest");
const express = require("express");
const gameController = require("./gameController");
const gameService = require("../services/gameService");

// filepath: d:\Gil_Reandelar_BackendDeveloper_GameLibraryExam\controllers\gameController.test.js

jest.mock("../services/gameService");

const app = express();
app.use(express.json());
app.post("/games", gameController.createGame);
app.put("/games/:id", gameController.updateGame);
app.delete("/games/:id", gameController.deleteGame);
app.get("/games", gameController.getGames);
app.get("/games/search", gameController.searchGames);

describe("gameController", () => {
  describe("createGame", () => {
    it("should create a new game successfully", async () => {
      const mockGame = { id: "1", name: "Test Game" };
      gameService.createGame.mockResolvedValue(mockGame);

      const res = await request(app).post("/games").send({ name: "Test Game" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockGame);
    });
  });

  describe("updateGame", () => {
    it("should return 400 for invalid ID", async () => {
      const res = await request(app).put("/games/invalid-id").send({ name: "Updated Game" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid input: Game ID is not valid" });
    });

    it("should return 404 if game is not found", async () => {
      gameService.updateGame.mockResolvedValue(null);

      const res = await request(app).put("/games/507f1f77bcf86cd799439011").send({ name: "Updated Game" });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Missing Data: No game found" });
    });

    it("should update a game successfully", async () => {
      const mockGame = { id: "1", name: "Updated Game" };
      gameService.updateGame.mockResolvedValue(mockGame);

      const res = await request(app).put("/games/507f1f77bcf86cd799439011").send({ name: "Updated Game" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockGame);
    });
  });

  describe("deleteGame", () => {
    it("should return 400 for invalid ID", async () => {
      const res = await request(app).delete("/games/invalid-id");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid input: Game ID is not valid" });
    });

    it("should return 404 if game is not found", async () => {
      gameService.deleteGame.mockResolvedValue(null);

      const res = await request(app).delete("/games/507f1f77bcf86cd799439011");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Missing Data: No games found" });
    });

    it("should delete a game successfully", async () => {
      const mockGame = { id: "1", name: "Deleted Game" };
      gameService.deleteGame.mockResolvedValue(mockGame);

      const res = await request(app).delete("/games/507f1f77bcf86cd799439011");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockGame);
    });
  });

  describe("getGames", () => {
    it("should return 404 if no games are found", async () => {
      gameService.getGames.mockResolvedValue([]);

      const res = await request(app).get("/games");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Missing Data: Database is empty" });
    });

    it("should return all games successfully", async () => {
      const mockGames = [{ id: "1", name: "Game 1" }, { id: "2", name: "Game 2" }];
      gameService.getGames.mockResolvedValue(mockGames);

      const res = await request(app).get("/games");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockGames);
    });
  });

  describe("searchGames", () => {
    it("should return 404 if no games match the search", async () => {
      gameService.searchGames.mockResolvedValue([]);

      const res = await request(app).get("/games/search?search=nonexistent");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "Missing Data: No games found" });
    });

    it("should return matching games successfully", async () => {
      const mockGames = [{ id: "1", name: "Matching Game" }];
      gameService.searchGames.mockResolvedValue(mockGames);

      const res = await request(app).get("/games/search?search=match");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockGames);
    });
  });
});