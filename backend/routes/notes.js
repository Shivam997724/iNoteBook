const express = require('express');
const router = express.Router();
var fatchuser = require('../middleware/fatchuser');
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator")


//ROTES 1: get All the Notes using: GET "/api/notes/getuser".login required
router.get('/fetchallnotes', fatchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server some Error occured")
    }
})

//ROTES 2: Add new notes: POST"/api/notes/addnotes".login required
router.post('/addnotes', fatchuser, [
    body('title', "enter the valid title").isLength({ min: 3 }),
    body('description', "description must be at least 5 character").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server some Error occured")
    }
})
//ROTES 3: update notes: PUT"/api/notes/updatenote".login required
router.put('/updatenotes/:id', fatchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server some Error occured")
    }

})

//ROTES 4: Delete notes: PUT"/api/notes/deletenote".login required
router.delete('/deletenotes/:id', fatchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server some Error occured")
    }
})


module.exports = router