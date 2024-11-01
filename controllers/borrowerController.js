const db = require("../models");
const borrowersService = require("../services/borrowersService");
const borrowingService = require("../services/borrowingService");

exports.getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await borrowersService.getAllBorrowers(req.query);
        return res.status(200).json(borrowers);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};

exports.getBorrower = async (req, res) => {
    try {
        const borrower = await borrowersService.getBorrowerById(req.params.borrowerID);

        if (!borrower) {
            return res.status(404).send();
        }

        return res.status(200).json(borrower);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};

exports.createBorrower = async (req, res) => {
    try {
        const borrower = await borrowersService.createBorrower(req.body);

        return res.status(201).json(borrower);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};

exports.updateBorrower = async (req, res) => {
    try {
        let borrower = await borrowersService.updateBorrower(req.params.borrowerID, req.body);
        return res.status(200).json(borrower);
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};

exports.deleteBorrower = async (req, res) => {
    try {
        const borrower = await borrowersService.getBorrowerById(req.params.borrowerID);

        if (!borrower) {
            return res.status(404).send();
        }

        const borrowedBooks = await borrowingService.getBorrowerBorrowedBooks(
            req.params.borrowerID
        );

        if(borrowedBooks.length > 0) {
            return res.status(400).json({
                message: `Borrower currently has ${borrowedBooks.length} borrowed books and can not be deleted.`
            });
        }

        await borrower.destroy()
        return res.status(204).send();
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};