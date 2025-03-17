/**
 * MyExpress Framework - Centralized Routing Module
 * ------------------------------------------------
 * This file serves as the core routing hub for MyExpress, 
 * ensuring that all application routes are well-structured 
 * and maintainable.
 *
 * - Auth routes are modularized and loaded from the `auth` module.
 * - Additional routes should be added below for better organization.
 * - Middleware (such as authentication) is applied to protect routes.
 *
 * Designed and Developed by Giceha Junior
 * GitHub: https://github.com/Gicehajunior
 */
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
