const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'La contraseña debe tener mínimo 6 caractéres').isLength({min: 6})
    ],
    authController.authUser
    );

module.exports = router;