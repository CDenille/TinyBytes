const router = require('express').Router();
const userRoute = require('./users')
const favoritesRoute = require('./favorites')
const profileRoute = require('./profile')
const publicApiRoute = require('./publicFacingAPIs')
const reviewRoute = require('./review')

router.use('/chefs', userRoute)
router.use('/user', favoritesRoute)
router.use('/profile', profileRoute)
router.use('/publicApi', publicApiRoute)
router.use('/recipe', reviewRoute)

module.exports = router;
