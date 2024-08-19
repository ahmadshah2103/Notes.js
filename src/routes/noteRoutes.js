const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteControllers');
const {authenticate} = require("../middlewares/authenticate");
const {validateCreateNotes, validateUpdateNotes} = require("../middlewares/validateNotes");

router.post('/:id/notes', authenticate, validateCreateNotes, noteController.createNote)
router.get('/:userId/notes', authenticate, noteController.getNotes)
router.get('/:userId/notes/:noteId', authenticate, noteController.getNote)
router.put('/:userId/notes/:noteId', authenticate, validateUpdateNotes, noteController.updateNote)
router.delete('/:userId/notes/:noteId', authenticate, noteController.deleteNote)

module.exports = router;