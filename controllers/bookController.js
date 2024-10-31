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

exports.getBook = async function (req, res) {
    try {
        const book = await booksService.getBookById(req.params.bookID);

        if(!book) {
            return res.status(404).send();
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ message: `ERROR: ${error.message}` });
    }
}

exports.createBook = async function (req, res) {
    try {
        const createBookResult = await booksService.createBook(req.body);
        return res.status(201).json(createBookResult);
    }
    catch (error) {
        return res.status(error.statusCode ?? 500).json({ message: `ERROR: ${error.message}` });
    }
};

exports.deleteBook = async function (req, res) {
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

exports.putBook = async function (req, res) {
    try {
        const updatedBook = await booksService.updateBook(req.params.bookID, req.body);
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ message: `ERROR: ${error.message}` });
    }
};

exports.patchBook = async function (req, res) {
    try {
        const updatedBook = await booksService.updateBook(req.params.bookID, req.body);
        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({ message: `ERROR: ${error.message}` });
    }
}