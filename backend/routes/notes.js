const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes 
router.get("/fetchallnotes", async (req, res) => {
  try {
    // Fetch all notes from the database
    const notes = await Notes.find({});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//ROUTE 2: Add a new Note
router.post(
  "/addnotes",
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be of at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note without user-specific data
      const note = new Notes({
        title,
        description,
      });

      // Save the note
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: feth the note by title
router.get("/searchnotes", async (req, res) => {
  try {
    const { title } = req.query; // Get the search term from query parameters

    // Validate the title
    if (!title) {
      return res.status(400).json({ error: "Title parameter is required" });
    }

    // Fetch notes where the title contains the provided value (case-insensitive)
    const Note= require('../models/Notes');
    const notes = await Note.find({
      title: { $regex: new RegExp(title, "i") },
    });

    res.json(notes); // Send the matching notes as a response
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3: Update a note using: PUT "api/auth/updatenote".Login Required.
router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // note.user.toString() will giver user id
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: Delete a note using: Delete "api/auth/deletenote".Login Required.

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    // note.user.toString() will giver user id
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

