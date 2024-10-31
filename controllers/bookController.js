const {validationResult} = require("express-validator");
const db = require("../models");
const booksService = require('../services/booksService');

exports.getAllBooks = async function (req, res) {
    try {
        const booksConditions = booksService.getBooksQueryFilters(req.query);
        const authorConditions = booksService.getAuthorsAssocQueryFilters(req.query);

        const books = await db.Book.findAll({
            include: [
                {
                    model: db.Author,
                    as: 'author',
                    attributes: ['name'],
                    where: authorConditions
                }
            ],
            where: booksConditions
        });
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({ message: `ERROR: ${err.message}` });
    }
};

exports.createBook = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const createBookResult = await booksService.createBook(req.body);
        return res.status(201).json(createBookResult);
    }
    catch (error) {
        return res.status(error.statusCode ?? 500).json({ message: `ERROR: ${error.message}` });
    }
};

exports.deleteBook = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const bookID = req.params.bookID;

        let book = await db.Book.findOne({
            id: bookID
        });

        if(!book){
            return res.status(404).json({
                message: `ERROR: No author exists with id ${bookID}`
            })
        }

        await book.destroy();

        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: `ERROR: ${error.message}` });
    }
};