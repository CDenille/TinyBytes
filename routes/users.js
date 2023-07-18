const router = require('express').Router();
const basicAuth = require('express-basic-auth');
const {User, Recipe}= require('../db/associations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/', async (req,res)=>{
try {
    const newUSer = await User.create(req.body)
    res.json({newUSer})
} catch (error) {
    console.log(error)
    res.json(error)
}
})
module.exports= router;