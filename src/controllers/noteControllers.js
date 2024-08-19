const {Note} = require('../models');
const {Op, where, col, fn} = require("sequelize");

const createNote = async (req, res, next) => {
    try {
        const note = await Note.create({...req.body, userId: req.params.id});
        if (!note)
            return res.status(400).json({message: 'Note creation failed!'});
        return res.status(200).json(note);

    } catch (error) {
        next(error);
    }
}

const getNotes = async (req, res, next) => {
    try {
        const title = req.query.title || '';
        const content = req.query.content || '';

        const notes = await Note.findAll({
            where: {
                userId: req.params.userId,

                [Op.and]: [
                    {[Op.iLike]: where(fn('LOWER', col('title')), 'iLIKE', `%${title.toLowerCase()}%`)},
                    {[Op.iLike]: where(fn('LOWER', col('content')), 'iLIKE', `%${content.toLowerCase()}%`)},
                ]
            }
        });
        if (!notes)
            return res.status(404).json({message: 'Note not found!'});
        return res.status(200).json(notes);

    } catch (error) {
        next(error);
    }
}

const getNote = async (req, res, next) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.noteId,
                userId: req.params.userId
            }
        });
        if (!note)
            return res.status(404).json({message: 'Note note found!'});
        return res.status(200).json(note);

    } catch (error) {
        next(error);
    }
}

const updateNote = async (req, res, next) => {
    try {
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

    } catch(error) {
        next(error);
    }
}

const deleteNote = async (req, res, next) => {
    try {
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

    } catch(error) {
        next(error);
    }
}

module.exports = {createNote, getNotes, getNote, updateNote, deleteNote};
