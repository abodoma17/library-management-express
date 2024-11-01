const express = require('express');
const router = express.Router();

const bookRoutes = require('./bookRoutes');
const authorRoutes = require('./authorRoutes');
const borrowerRoutes = require('./borrowerRoutes');
const borrowingRoutes = require('./borrowingRoutes');
const exportRoutes = require('./exportRoutes');

router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);
router.use('/borrowers', borrowerRoutes);
router.use('/', borrowingRoutes);
router.use('/export', exportRoutes);

module.exports = router;