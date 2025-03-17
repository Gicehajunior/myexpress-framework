const express = require('express');
const authRoutes = require('./auth'); 
const JournalController = require('../app/controllers/other/JournalController');
const authMiddleware = require('../app/mwares/authMiddleware');

const router = express.Router();

// Auth Routes
authRoutes(router);

// Add New Routes here...
router.post('/', authMiddleware, JournalController.createJournal);
router.get('/', authMiddleware, JournalController.getJournals);

module.exports = router;
