const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');
const {check} = require('express-validator');
const validateInputsMiddleware = require('../middlewares/validateInputsMiddleware');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 10,
});

router.post('/borrowers/:borrowerID/checkout/:bookID', [
        limiter,
        check('borrowerID').isNumeric().withMessage('Book ID should be valid number'),
        check('bookID').isNumeric().withMessage('Book ID should be valid number'),
        check('due_date').isISO8601().withMessage('Due date should be valid date'),
        validateInputsMiddleware
    ],
    borrowingController.borrowBook
);

router.put('/borrowers/:borrowerID/return/:bookID', [
        limiter,
        check('borrowerID').isNumeric().withMessage('Book ID should be valid number'),
        check('bookID').isNumeric().withMessage('Book ID should be valid number'),
        validateInputsMiddleware
    ],
    borrowingController.returnBook
);

router.get('/borrowers/:borrowerID/borrowed/overdue', [
        check('borrowerID').isNumeric().withMessage('Book ID should be valid number'),
        validateInputsMiddleware
    ],
    borrowingController.getOverdueBooks
);

router.get('/borrowers/:borrowerID/borrowed', [
        check('borrowerID').isNumeric().withMessage('Book ID should be valid number'),
        validateInputsMiddleware
    ],
    borrowingController.getBorrowerBorrowedBooks
);

module.exports = router;