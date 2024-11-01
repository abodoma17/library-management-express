const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

router.get('/overdue-books', exportController.exportLastMonthOverdueBooks);
router.get('/borrowed-books', exportController.exportLastMonthBorrowedBooks);

module.exports = router;