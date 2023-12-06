// routes/fetch-books.js
const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");

router.post("/fetchbooks", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { name, genrePreference, numPagesPreference } = req.body;

    // Validate required fields
    if (!name || !genrePreference || !numPagesPreference) {
      return res.status(400).json({
        error: "Name, genrePreference, and numPagesPreference are required.",
      });
    }

    // Check if the user already exists
    let existingUser = await User.findOne({ name });

    if (!existingUser) {
      // Create a new user
      existingUser = new User({
        name,
        preferences: [],
      });
    }

    // Check if the user already has a preference with the same genre
    const existingPreferenceIndex = existingUser.preferences.findIndex(
      (preference) =>
        preference.genre.toLowerCase() === genrePreference.toLowerCase()
    );

    if (existingPreferenceIndex !== -1) {
      // Update existing preference if it already exists
      existingUser.preferences[existingPreferenceIndex].numPages =
        numPagesPreference;
    } else {
      // Add a new preference if it doesn't exist
      existingUser.preferences.push({
        genre: genrePreference,
        numPages: numPagesPreference,
      });
    }

    // Save the user with updated preferences
    await existingUser.save();

    // Fetch all books from the database
    const allBooks = await Book.find();

    // Separate books into two arrays: matching genre and non-matching genre
    const matchingGenreBooks = [];
    const nonMatchingGenreBooks = [];

    allBooks.forEach((book) => {
      if (book.genre.toLowerCase() === genrePreference.toLowerCase()) {
        matchingGenreBooks.push(book);
      } else {
        nonMatchingGenreBooks.push(book);
      }
    });

    // Sort matching genre books by number of pages
    matchingGenreBooks.sort(
      (a, b) =>
        Math.abs(a.numPages - numPagesPreference) -
        Math.abs(b.numPages - numPagesPreference)
    );

    // Sort non-matching genre books by number of pages
    nonMatchingGenreBooks.sort(
      (a, b) =>
        Math.abs(a.numPages - numPagesPreference) -
        Math.abs(b.numPages - numPagesPreference)
    );

    // Combine matching and non-matching genre books
    const matchedBooks = [...matchingGenreBooks, ...nonMatchingGenreBooks];

    res
      .status(200)
      .json({ message: "Books fetched successfully", books: matchedBooks });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
