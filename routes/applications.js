
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const appCtrl = require('../controllers/applicationController');
/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Application management endpoints (requires authentication)
 */
router.use(auth);
/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new job application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               company:
 *                 type: string
 *                 example: OpenAI
 *               jobLink:
 *                 type: string
 *                 example: https://example.com/job/123
 *               appliedDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-12
 *               notes:
 *                 type: string
 *                 example: Applied via referral
 *               resumeLink:
 *                 type: string
 *                 example: https://example.com/resume.pdf
 *     responses:
 *       201:
 *         description: Application created successfully
 *       500:
 *         description: Server error
 */
router.post('/', appCtrl.createApplication);
/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all job applications for the logged-in user
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *       500:
 *         description: Server error
 */

router.get('/', appCtrl.getApplications);
/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get a single application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application details
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', appCtrl.getApplication);
/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Update a job application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               notes: Updated interview date
 *     responses:
 *       200:
 *         description: Application updated
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.put('/:id', appCtrl.updateApplication);
/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete a job application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       200:
 *         description: Application deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', appCtrl.deleteApplication);
module.exports = router;
