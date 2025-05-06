const validateGameData = (data) => {
  if (!data) {
    // check if the body is provided
    return "Invalid input: Request body is empty";
  }
  if (!data.title || data.title.trim() === "") {
    // check if the title is provided
    return "Invalid input: Title is required";
  }
  if (!data.genre || data.genre.trim() === "") {
    // check if the genre is provided
    return "Invalid input: Genre is required";
  }
  if (!data.platform || data.platform.trim() === "") {
    // check if the platform is provided
    return "Invalid input: Platform is required";
  }
  if (data.releaseDate && isNaN(Date.parse(data.releaseDate))) {
    // validate release date
    return "Invalid input: Release date format is invalid";
  }
  if (!data.releaseDate || data.releaseDate.trim() === "") {
    // check if the release date is provided
    return "Invalid input: Release date is required";
  }
  return null;
};

module.exports = validateGameData;
