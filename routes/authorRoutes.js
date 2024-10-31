const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const {check} = require("express-validator");

router.get('/', authorController.getAllAuthors);

router.post('/', [
    check('name').notEmpty().withMessage('Name is required'),
], authorController.createAuthor);

router.delete('/:authorID', authorController.deleteAuthor);

module.exports = router;

