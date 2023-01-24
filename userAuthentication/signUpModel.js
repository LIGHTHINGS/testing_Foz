const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signUpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    password : {
        type: String,
        required: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// signUpSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', signUpSchema);