const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')



//item model
const User = require("../../model/User");
const auth = require('../../middleware/auth');

//@route POST api/auth
//@desc Auth  user

router.post('/', (req, res)=>{
  const { email, password} = req.body


  //basic validation
  if(!email || !password){
     return res.status(400).json({msg : "please enter all feilds"})
  }


  //existing user
  User.findOne({email})
  .then(user =>{
     if(!user) return res.status(400).json({msg: "user does not exists"})

     //validate pwd
     bcrypt.compare(password,user.password)
     .then(isMatch =>{
         if(isMatch) return res.status(400).json({msg: "Invalid credentials"})

         jwt.sign(
            {id:user.id },
            config.get('jwtSecret'),
            { expiresIn:3600},
            (err, token)=>{
               if(err) throw err;
               res.json({
                token,
                user:{
                   id:user.id,
                   name:user.name,
                   email:user.email
                }
             })
            }
         )


     })

  })
})

//@route POST api/auth/user
//@desc Get  user data
//@access private
router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports =  router;