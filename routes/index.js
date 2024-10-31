const express = require('express');
const router = express.Router();

const bookRoutes = require('./bookRoutes');
const authorRoutes = require('./authorRoutes');

router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);

module.exports = router;