const db = require("../models");
const authorsService = require("../services/authorsService");

exports.getAllAuthors = async function (req, res) {
    try {
        const authors = await db.Author.findAll();

        return res.status(200).json(authors);
    } catch (err) {
        return res.status(500).json({
            message: `ERROR: ${err.message}`
        });
    }
};

exports.getAuthor = async function (req, res) {
    try {
        const author = await authorsService.getAuthorById(req.params.authorID, false);

        if (!author) {
            return res.status(404).send();
        }

        return res.status(200).json(author);
    } catch {
        return res.status(error.statusCode ?? 500).json({
            message: `ERROR: ${err.message}`
        });
    }
}

exports.getAuthorBooks = async function (req, res) {
    try {
        const author = await authorsService.getAuthorById(req.params.authorID, true);

        if (!author) {
            return res.status(404).send();
        }

        return res.status(200).json(author.books);
    } catch {
        return res.status(error.statusCode ?? 500).json({
            message: `ERROR: ${err.message}`
        });
    }
}

exports.createAuthor = async function (req, res) {
    try {
        const newAuthor = await authorsService.createAuthor(req.body);
        return res.status(200).json(newAuthor);
    } catch (error) {
        return res.status(error.statusCode ?? 400).json({
            message: `ERROR: ${error.message}`
        });
    }
};

exports.deleteAuthor = async function (req, res) {
    const authorID = req.params.authorID;

    let author = await db.Author.findOne({
        where: {
            id: authorID
        }
    });

    if (!author) {
        return res.status(404).send()
    }

    await author.destroy();
    return res.status(204).json({})
};

exports.updateAuthor = async function (req, res) {
    try {
        const updatedAuthor = await authorsService.updateAuthor(req.params.authorID, req.body);
        return res.status(200).json(updatedAuthor);
    } catch (error) {
        return res.status(error.statusCode ?? 500).send();
    }
}