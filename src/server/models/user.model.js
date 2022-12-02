//Contains all the user related info

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, max: 300 },
    email : {type: String, required : true, max:300,unique:true},
    password : {type: String,  max:32},
    role: { type: String, required: true, max: 32,default: 'user' },   // admin; open; secure
    isEnabled: { type: Boolean, default: true },                        // Enabled or disabled by admin
    isVerified: { type: Boolean, default: false },                      // Is email verified
    third_party: { type: Boolean, default: false },                     // Verified via thrid party or by userid-pwd
    passwordResetToken: String,
    passwordResetExpires: Date
}, { collection: 'user_details' });

module.exports = mongoose.model('User', userSchema);