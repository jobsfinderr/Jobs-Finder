const router = require('express').Router()
const jobsRoutes = require('./jobsRoutes')
const userRoutes = require('./userRoutes')


router.use('/jobs', jobsRoutes)


module.exports = router