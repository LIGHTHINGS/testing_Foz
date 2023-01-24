// Importing modules
const dotenv = require('dotenv');
// const { Router } = require('express');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoute = require('./Routes/Admin.js');
const clientRoute = require('./Routes/Client.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const store = session.MemoryStore();
const User = require('./userAuthentication/signUpModel');
const cookieParser = require('cookie-parser');


//Configurations
const app = express();
// const CONNECTION_URI ='mongodb://localhost/ecomm';
const CONNECTION_URI = process.env.CONNECTION_URI;
const PORT = process.env.PORT || 8080;


// Middleswares ========
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(session({
//     secret: process.env.SECRET,
//     cookie: {maxAge: 60 * 60 * 60 * 2},
//     saveUninitialized: false,
//     resave: false,
//     store
// }));
app.use(cookieParser())
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use('/api', adminRoute, clientRoute);

// Routes ===========
app.get('/home', (req, res) => {
    res.send('<h1> Working fine</h1>')
});
//connecting mongoose ========
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api`, `\nDatabase connected!!`)
})).catch((error) => {
    console.log(error.message)
});