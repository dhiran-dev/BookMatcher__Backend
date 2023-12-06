// routes/add-user.js
const router = require("express").Router();
const User = require("../models/user");

router.post("/adduser", async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { name, preference } = req.body;

    // Validate required fields
    if (!name || !preference) {
      return res
        .status(400)
        .json({ error: "Name and preference are required." });
    }

    // Check if a user with the same name already exists
    let existingUser = await User.findOne({ name });

    if (existingUser) {
      // User already exists, update preferences
      existingUser.preferences.push(preference);
      await existingUser.save();

      return res
        .status(200)
        .json({ message: "User preferences updated", user: existingUser });
    }

    // Create a new user
    const newUser = new User({
      name,
      preferences: [preference], // Convert single preference to an array
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
