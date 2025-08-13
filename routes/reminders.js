
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const remCtrl = require('../controllers/reminderController');
/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: API for managing reminders
 */
router.use(auth);
/**
 * @swagger
 * /api/reminders:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationId
 *               - remindAt
 *               - message
 *             properties:
 *               applicationId:
 *                 type: string
 *                 example: "66b9d9f7f1b1f4a9f4c12345"
 *               remindAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-08-15T10:00:00Z"
 *               message:
 *                 type: string
 *                 example: "Follow up with recruiter"
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', remCtrl.createReminder);
/**
 * @swagger
 * /api/reminders:
 *   get:
 *     summary: Get all reminders for the logged-in user
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   remindAt:
 *                     type: string
 *                     format: date-time
 *                   message:
 *                     type: string
 *                   application:
 *                     type: object
 *       401:
 *         description: Unauthorized
 */
router.get('/', remCtrl.getReminders);
module.exports = router;
