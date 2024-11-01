const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const {check} = require("express-validator");
const ValidateInputsMiddleware = require('../middlewares/ValidateInputsMiddleware');

router.get('/', authorController.getAllAuthors);

router.get('/:authorID', [
        check('authorID').isNumeric().withMessage('Book ID should be a number'),
        ValidateInputsMiddleware
    ],
    authorController.getAuthor);

router.get('/:authorID/books', [
        check('authorID').isNumeric().withMessage('Book ID should be a number'),
        ValidateInputsMiddleware
    ],
    authorController.getAuthorBooks);

router.post('/', [
    check('name').notEmpty().withMessage('Name is required').trim().escape(),
    ValidateInputsMiddleware
], authorController.createAuthor);

router.put('/:authorID', [
    check('authorID').isNumeric().withMessage('Book ID should be a number'),
    check('name').notEmpty().withMessage('Name is required').trim().escape(),
    ValidateInputsMiddleware
], authorController.updateAuthor);

router.patch('/:authorID', [
    check('authorID').isNumeric().withMessage('Book ID should be a number'),
    ValidateInputsMiddleware
], authorController.updateAuthor);


router.delete('/:authorID', authorController.deleteAuthor);

module.exports = router;

