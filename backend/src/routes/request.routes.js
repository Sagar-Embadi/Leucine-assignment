// const express = require('express');
// const router = express.Router();
// const requestController = require('../controllers/request.controller');
// const auth = require('../middleware/auth.middleware');
// const role = require('../middleware/role.middleware');

// router.post('/', auth, role('Employee'), requestController.submitRequest);
// router.get('/pending', auth, role('Manager'), requestController.getPendingRequests);
// router.patch('/:id', auth, role('Manager'), requestController.updateRequestStatus);

// module.exports = router;

import express from 'express';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
} from '../controllers/request.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Employee', 'Manager'), createRequest);
router.get('/', authenticate, getRequests);
router.patch('/:id/status', authenticate, authorizeRoles('Admin','Manager'), updateRequestStatus);

export default router;
