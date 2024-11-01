const db = require("../models");
const borrowingService = require("../services/borrowingService");
const borrowersService = require("../services/borrowersService");

exports.borrowBook = async (req, res) => {
    try {
        const borrowedBookRecord = await borrowingService.checkoutBook(req.params.borrowerID, req.params.bookID, req.body);
        return res.status(200).json(borrowedBookRecord);
    } catch (error) {
        return res.status(error.statusCode ?? 500).send({
            message: error.message
        });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const borrowedBookRecord = await borrowingService.returnBook(req.params.borrowerID, req.params.bookID, req.body);
        return res.status(200).json(borrowedBookRecord);
    } catch (error) {
        return res.status(error.statusCode ?? 500).send({
            message: error.message
        });
    }
};

exports.getOverdueBooks = async (req, res) => {
    try {
        const borrowerID = req.params.borrowerID;
        const borrower = await borrowersService.getBorrowerById(borrowerID);

        if (!borrower) {
            return res.status(404).send();
        }

        const overdueBooks = await borrowingService.getBorrowerBorrowedBooks(borrowerID, true, true, true);

        return res.status(200).json(overdueBooks);
    } catch (error) {
        return res.status(error.statusCode ?? 500).send({
            message: error.message
        });
    }
};

exports.getBorrowerBorrowedBooks = async (req, res) => {
    try {
        const borrowerID = req.params.borrowerID;
        const borrower = await borrowersService.getBorrowerById(borrowerID);

        if (!borrower) {
            return res.status(404).send();
        }

        const overdueBooks = await borrowingService.getBorrowerBorrowedBooks(borrowerID, false, true, true);

        return res.status(200).json(overdueBooks);
    } catch (error) {
        return res.status(error.statusCode ?? 500).send({
            message: error.message
        });
    }
};
