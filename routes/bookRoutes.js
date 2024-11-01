const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateInputsMiddleware = require('../middlewares/validateInputsMiddleware');

router.get('/', bookController.getAllBooks);

router.get('/:bookID', [
        check('bookID').isNumeric().withMessage('Book ID should be a number'),
        validateInputsMiddleware
    ],
    bookController.getBook);

router.post('/', [
    check('title').notEmpty().withMessage('Title is required').trim().escape(),
    check('isbn').notEmpty().withMessage('ISBN is required').trim().escape(),
    check('shelf_location').notEmpty().withMessage('Shelf Location is required').trim().escape(),
    check('available_quantity').isInt({gt: 0}).withMessage('Available Quantity must be a positive integer'),
    validateInputsMiddleware
], bookController.createBook);

router.delete('/:bookID', [
    check('bookID').isNumeric().withMessage('Book ID should be a number'),
    validateInputsMiddleware
], bookController.deleteBook);

router.put('/:bookID', [
    check('bookID').isNumeric().withMessage('Book ID should be a number'),
    check('title').notEmpty().withMessage('Title is required').trim().escape(),
    check('isbn').notEmpty().withMessage('ISBN is required').trim().escape(),
    check('shelf_location').notEmpty().withMessage('Shelf Location is required').trim().escape(),
    check('available_quantity').isInt({gt: 0}).withMessage('Available Quantity must be a positive integer'),
    validateInputsMiddleware
], bookController.putBook);

router.patch('/:bookID', [
    check('bookID').isNumeric().withMessage('Book ID should be a number'),
    check('available_quantity').optional().isInt({gt: 0}).withMessage('Available Quantity must be a positive integer'),
    validateInputsMiddleware
], bookController.putBook);

module.exports = router;
