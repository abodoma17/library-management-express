const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const {check} = require('express-validator');
const validateInputsMiddleware = require('../middlewares/validateInputsMiddleware');

router.get('/', borrowerController.getAllBorrowers);

router.get('/:borrowerID', [
        check('borrowerID').isNumeric().withMessage('Borrower ID must be a number'),
        validateInputsMiddleware
    ],
    borrowerController.getBorrower
);

router.post('/', [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').notEmpty().isEmail().withMessage('Valid email address is required'),
        validateInputsMiddleware
    ],
    borrowerController.createBorrower
);

router.put('/:borrowerID', [
        check('borrowerID').isNumeric().withMessage('Borrower ID must be a number'),
        check('name').notEmpty().withMessage('Name is required'),
        check('email').notEmpty().isEmail().withMessage('Valid email address is required'),
        validateInputsMiddleware
    ],
    borrowerController.updateBorrower
);

router.patch('/:borrowerID', [
        check('borrowerID').isNumeric().withMessage('Borrower ID must be a number'),
        check('name').optional().notEmpty().withMessage('Name is required'),
        check('email').optional().notEmpty().isEmail().withMessage('Valid email address is required'),
        validateInputsMiddleware
    ],
    borrowerController.updateBorrower
);

router.delete('/:borrowerID', [
        check('borrowerID').isNumeric().withMessage('Borrower ID must be a number'),
        validateInputsMiddleware
    ],
    borrowerController.deleteBorrower
);


module.exports = router;