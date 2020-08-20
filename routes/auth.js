const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/',
    authController.authUser
    );

router.get('/',
    auth,
    authController.getAuthUser
    );

module.exports = router;