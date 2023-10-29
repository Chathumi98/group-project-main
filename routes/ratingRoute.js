// Import necessary modules and models
import express from "express";
import Rating from "../models/rating.js";

// Create an Express router
const router = express.Router();

// Route for creating a new rating
router.post("/api/v1/submit-rating", async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, productId, rating } = req.body;

    // Check if the user has already rated this product
    const existingRating = await Rating.findOne({ userId, productId });

    if (existingRating) {
      // User has already rated this product, reject the new rating
      res.status(400).json({ message: "You have already rated this product" });
    } else {
      // User hasn't rated this product, create a new rating document
      const newRating = new Rating({
        userId,
        productId,
        rating,
      });

      // Save the new rating to the database
      await newRating.save();

      // Respond with a success message
      res.status(201).json({ message: "Rating created successfully", rating: newRating });
    }
  } catch (error) {
    // Handle errors
    console.error("Error creating rating:", error);
    res.status(500).json({ message: "An error occurred while creating the rating" });
  }
});

export default router;
