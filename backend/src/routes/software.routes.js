// const express = require('express');
// const router = express.Router();
// const softwareController = require('../controllers/software.controller');
// const auth = require('../middleware/auth.middleware');
// const role = require('../middleware/role.middleware');

// router.post('/', auth, role('Admin'), softwareController.createSoftware);
// router.get('/', auth, softwareController.getAllSoftware);

// module.exports = router;

import express from 'express';
import { createSoftware, getAllSoftware, updateSoftware, deleteSoftware } from '../controllers/software.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Admin'), createSoftware);
router.get('/', authenticate, getAllSoftware);
router.patch('/:id', authenticate, authorizeRoles('Admin'), updateSoftware);
router.delete('/:id', authenticate, authorizeRoles('Admin'), deleteSoftware);

export default router;
