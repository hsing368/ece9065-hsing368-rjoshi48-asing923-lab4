express = require('express');
const User = require('../models/user.model');

exports.create_user = function (req, resp) {
    console.log("Inside Create User-----");
   console.log(req.body);

   User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return next(err); }
    else {
        if (user) {
            let error = 'Email Address Exists in Database.';
            return resp.status(400).json({ type: 'reg-failed', msg: error });
        } else{
            const user = new User(
                {
                    uid : req.body.uid,
                    username: req.body.username,
                    email : req.body.email,
                    password : req.body.password,
                    role: req.body.role,   
                    isEnabled: req.body.isEnabled,                       
                    isVerified: req.body.isVerified,  
                    providerId: req.body.providerId
                }
            )
               user.save(function(err, user){
                if (err){
                    return next(err);
                } else{
                        resp.status(200).send('user info saved');
                }
               })
            
        }
    }
})
    
}