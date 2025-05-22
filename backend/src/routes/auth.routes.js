// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/auth.controller');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// module.exports = router;

import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;