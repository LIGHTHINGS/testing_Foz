require('dotenv').config();
const express = require('express');
const router = express.Router();
// const userReg = require('../userAuthentication/signUp.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('../Models/model.js');
const User = require('../userAuthentication/signUpModel.js');

router.post('/signup', (req, res) => {
    // console.log(req.body)
    const {email , password} = req.body;
    User.find({email}, async (err, existingUser) => {
        if (err) {
            res.sendStatus(400);
        } else if (existingUser[0]) {
            res.send("Please make use of another email because this email already exist")
            // console.log(existingUser[0])
        } else {
         try {
            const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         // res.json([email,hashedPassword])
         User.create({ email: email, password: hashedPassword}, (err, user) => {
            if (err) console.log(err);
                    res.json(user.email).status(201)
                })
         } catch (error) {
            console.log(error)
         } };
    })
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.find({email},  async (err, user) => {
        if (err) res.sendStatus(501);
        if (!user[0]) {
            res.json({
                success: false,
                message: 'wrong credentials, please try again'
            }) 
        } else if (user) {
            if (await bcrypt.compare(password, user[0].password)) {
                const accessToken = jwt.sign({email: user[0].email} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: Math.floor(Date.now()/1000) + 60});
                // req.headers.isAuth = accessToken;
                res.cookie('jwt', accessToken);
                res.json({
                    success: true,
                    token:accessToken});
            } else {
                res.json({
                    success: false,
                    message: "Wrong Password, please try again"
                })
            }
        }
    })
});

// router.get('/logout', (req, res) => {
//     req.logout();
// })

const userLoggedIn = (req, res, next) =>  {
    const token = req.cookies.jwt;
    // const token = authHeader && authHeader.split(' ')[1];
    // const token = req.headers.isAuth;
    // console.log(authHeader)
    if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err , user) => {
        if (err) return res.sendStatus(403)
        next()
    }) } else {
        res.sendStatus(401)
    };
};

router.get('/product', userLoggedIn, (req, res) => {
    Product.find({}, (err, foundProduct) => {
        res.json(foundProduct);
    })
})
module.exports = router;
