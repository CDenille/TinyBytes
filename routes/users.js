const router = require('express').Router();
const basicAuth = require('express-basic-auth');
const {User, Recipe}= require('../db/associations');

const bcrypt = require('bcrypt');
const SALT = 2;


// sign up
router.post('/', async (req,res)=>{
    console.log('post hit')
try {
    const newUSer = await User.create(req.body)
    console.log('HEREREEEE', newUSer)
    res.json({newUSer})
} catch (error) {
    console.log(error)
    res.json(error)
}
})
module.exports= router;