const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteControllers');
const {authenticate} = require("../middlewares/authenticate");
const {validateCreateNotes, validateUpdateNotes} = require("../middlewares/validateNotes");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

router.post('/:userId/notes', authenticate, validateCreateNotes, asyncErrorHandler(noteController.createNote))
router.get('/:userId/notes', authenticate, asyncErrorHandler(noteController.getNotes))
router.get('/:userId/notes/:noteId', authenticate, asyncErrorHandler(noteController.getNote))
router.put('/:userId/notes/:noteId', authenticate, validateUpdateNotes, asyncErrorHandler(noteController.updateNote))
router.delete('/:userId/notes/:noteId', authenticate, asyncErrorHandler(noteController.deleteNote))

module.exports = router;