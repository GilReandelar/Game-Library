# Game Library Backend

This repository contains the backend implementation for the Game Library Exam project. It provides APIs for managing a collection of games, including features like adding, updating, deleting, and retrieving game information.

## Features
   - JWT Authentication
   - Add new games to the library.
   - Update existing game details.
   - Delete games from the library.
   - Retrieve a list of all games or search for specific games.

## Technologies Used

- **Programming Language**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/GameLibraryBackend.git
  ```
2. Navigate to the project directory:
  ```bash
  cd GameLibraryBackend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

4. Set environment variables:
  ```bash
  PORT=your_port_number
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key
  ```

## Usage
1. Run testing:
  ```bash
  npm test
  ```

2. Start the server:
  ```bash
  npm run dev
  ```
3. Access the API at `http://localhost:[port]/`.

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/login`          | Login user               |
| POST   | `/register`       | Register user            |
| GET    | `/games`          | Retrieve all games       |
| GET    | `/games/search`   | Search/filter games      |
| POST   | `/games`          | Add a new game           |
| PATCH  | `/games/:id`      | Update a game by ID      |
| DELETE | `/games/:id`      | Delete a game by ID      |

<!-- ## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries, please contact Gil Reandelar at greandelar@gmail.com -->