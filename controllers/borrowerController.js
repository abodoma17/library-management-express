const db = require("../models");
const borrowersService = require("../services/borrowersService");

exports.getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await db.Borrower.findAll();
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
        const borrower = await db.Borrower.findOne({
            where: {
                id: req.params.borrowerID
            }
        });

        if (!borrower) {
            return res.status(404).send();
        }

        await borrower.destroy()
        return res.status(204).send();
    } catch (error) {
        return res.status(error.statusCode ?? 500).json({
            message: error.message
        })
    }
};