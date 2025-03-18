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
const authRoutes = require('@routes/auth'); 
const DashboardController = require('@app/controllers/other/DashboardController');
const JournalController = require('@app/controllers/other/JournalController');
const authMiddleware = require('@app/mwares/authMiddleware');

const router = express.Router();

// Auth Routes
authRoutes(router);

// Add New Routes here...
router.get('/dashboard', authMiddleware, DashboardController.index);
router.get('/journals/list', authMiddleware, JournalController.getJournals);
router.post('/journals/create', authMiddleware, JournalController.createJournal);

module.exports = router;
