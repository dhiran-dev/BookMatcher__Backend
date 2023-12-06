const router = require("express").Router();
const Book = require("../models/book");

router.post("/addbook", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { title, author, genre, numPages } = req.body;

    // Validate required fields
    if (!title || !author || !genre || !numPages) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if a book with the same title already exists
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res
        .status(409)
        .json({ error: "Book with the same title already exists." });
    }

    // Create a new book
    const newBook = new Book({
      title,
      author,
      genre,
      numPages,
    });

    // Save the book to the database
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
