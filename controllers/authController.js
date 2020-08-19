const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {

    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        const realPasswd = await bcryptjs.compare(password, user.password);
        if(!realPasswd){
            return res.status(400).json({msg: 'Contraseña incorrecta'})
        }

        const payload = {
            user: { 
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn:3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token })
        });

    } catch (error) {
        console.log(error);
    }

}