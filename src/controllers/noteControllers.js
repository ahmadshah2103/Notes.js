const {Note} = require('../models');
const {Op, where, col, fn} = require("sequelize");

const createNote = async (req, res, next) => {
    const note = await Note.create({...req.body, userId: req.params.userId});
    if (!note)
        return res.status(400).json({message: 'Note creation failed!'});
    return res.status(200).json(note);
}

const getNotes = async (req, res, next) => {
    const title = req.query.title || '';
    const content = req.query.content || '';

    const notes = await Note.findAll({
        where: {
            userId: req.params.userId,

            [Op.and]: [
                {[Op.like]: where(fn('LOWER', col('title')), 'LIKE', `%${title.toLowerCase()}%`)},
                {[Op.like]: where(fn('LOWER', col('content')), 'LIKE', `%${content.toLowerCase()}%`)},
            ]
        }
    });
    if (!notes)
        return res.status(404).json({message: 'Note not found!'});
    return res.status(200).json(notes);
}

const getNote = async (req, res, next) => {
    const note = await Note.findOne({
        where: {
            id: req.params.noteId,
            userId: req.params.userId
        }
    });
    if (!note)
        return res.status(404).json({message: 'Note note found!'});
    return res.status(200).json(note);
}

const updateNote = async (req, res, next) => {
    const note = await Note.findOne({
        where: {
            id: req.params.noteId,
            userId: req.params.userId
        }
    });
    if (!note)
        return res.status(404).json({message: 'Note not found!'});
    const {title, content} = req.body
    note.update({title, content});
    return res.status(200).json(note);
}

const deleteNote = async (req, res, next) => {
    const note = await Note.findOne({
        where: {
            id: req.params.noteId,
            userId: req.params.userId
        }
    });
    if (!note)
        return res.status(404).json({message: 'Note not found!'});
    note.destroy();
        return res.status(200).json({message: 'Note deleted successfully!'});
}

module.exports = {createNote, getNotes, getNote, updateNote, deleteNote};
