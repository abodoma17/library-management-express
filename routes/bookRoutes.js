const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);

router.post('/', [
    check('title').notEmpty().withMessage('Title is required'),
    check('isbn').notEmpty().withMessage('ISBN is required'),
    check('shelfLocation').notEmpty().withMessage('Shelf Location is required'),
    check('availableQuantity').isInt({ gt: 0 }).withMessage('Available Quantity must be a positive integer'),
], bookController.createBook);

router.delete('/:bookID', [
    check('bookID').isNumeric().withMessage('Book ID should be a number'),
], bookController.deleteBook);

module.exports = router;
