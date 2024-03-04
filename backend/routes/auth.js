const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
var fatchuser = require('../middleware/fatchuser');
const { body, validationResult } = require("express-validator")



const JWT_SECRET = "Shivam$fake"
//Route:1 create a user using :POST api/auth/createuser . No login required
router.post('/createuser', [

  body('name', "enter a valid name").isLength({ min: 3 }),
  body('email', "enter a valid email").isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  //if there areerrors,return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  //check whether the user this email exists already 
  try {
    let user = await User.findOne({ email: req.body.email })
    console.log(user);
    if (user) {
      return res.status(400).json({success, error: "sorry a user with this email already exits" })
    }  
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
    //Create new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })
    const data1 = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data1, JWT_SECRET);
     success = true;
    // .then(user=>res.json(user));
    // .catch(err=>{console.log(err)})
    // res.json({error:'please enter valid email',message:err.message})
    res.json({ success , authtoken })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server some Error occured")
  }
})

//Route:2 Authentication a user :POST api/auth/login. No login required
router.post('/login', [
  body('email', "enter a valid email").isEmail(),
  body('password', "password should not be blank").exists(),
], async (req, res) => {
  let success =false;
  //if there areerrors,return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false;
      return res.status(400).json({ error: "please try to login with correct email" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({success, error: "please try to login with correct email" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server some Error occured")
  }
})

//Route:3 Get loggedin user detail using :POST api/auth/getuser. login required
router.post('/getuser', fatchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server some Error occured")
  }
})
module.exports = router;

