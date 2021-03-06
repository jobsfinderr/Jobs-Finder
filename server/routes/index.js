const router = require('express').Router()
const jobsRoutes = require('./jobsRoutes')
const userRoutes = require('./userRoutes')
const weatherRoutes = require('./weatherRoutes')


router.use('/jobs', jobsRoutes)
router.use('/weather', weatherRoutes)
router.use('/users', userRoutes)


module.exports = router