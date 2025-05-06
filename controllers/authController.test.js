const request = require("supertest");
const express = require("express");
const authController = require("./authController");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.post("/register", authController.register);
app.post("/login", authController.login);

describe("authController", () => {
  describe("register", () => {
    it("should return 400 if input validation fails", async () => {
      const res = await request(app).post("/register").send({
        username: "", // Invalid username
        email: "invalid-email", // Invalid email
        password: "123", // Invalid password
      });

      expect(res.status).toBe(400);
      expect(res.body.errors).toEqual([
        "Username is required and must be a non-empty string.",
        "A valid email is required.",
        "Password must be at least 6 characters long.",
      ]);
    });

    it("should return 400 if the user already exists", async () => {
      User.findOne.mockResolvedValue({ email: "existing@example.com" });

      const res = await request(app).post("/register").send({
        username: "existingUser",
        email: "existing@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid Input: Username or email already exists" });
    });

    it("should return 201 and success message if user is registered successfully", async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.prototype.save = jest.fn().mockResolvedValue();

      const res = await request(app).post("/register").send({
        username: "newUser",
        email: "new@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: "User registered successfully" });
    });
  });

  describe("login", () => {
    it("should return 400 if email is empty", async () => {
      const res = await request(app).post("/login").send({
        email: "", // Invalid email
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "Email is required and must be a valid string.",
      });
    });

    it("should return 400 if password is empty", async () => {
      const res = await request(app).post("/login").send({
        email: "new@example.com",
        password: "", // Invalid password
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "Password is required and must be a valid string.",
      });
    });

    it("should return 401 if the email is invalid", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/login").send({
        email: "invalid@example.com",
        password: "password123",
      });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        error: "Invalid Credentials: Invalid email or password",
      });
    });

    it("should return 401 if the password is invalid", async () => {
      User.findOne.mockResolvedValue({
        email: "valid@example.com",
        password: "hashedPassword",
      });
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app).post("/login").send({
        email: "valid@example.com",
        password: "wrongPassword",
      });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        error: "Invalid Credentials: Invalid email or password",
      });
    });

    it("should return 200 and a token if login is successful", async () => {
      User.findOne.mockResolvedValue({
        _id: "userId",
        email: "valid@example.com",
        password: "hashedPassword",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken");

      const res = await request(app).post("/login").send({
        email: "valid@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ token: "mockToken" });
    });
  });
});