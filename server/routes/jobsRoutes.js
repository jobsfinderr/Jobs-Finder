const router = require('express').Router()
const jobsController = require('../controllers/jobController')


router.get('/', jobsController.getListJobs)
router.post('/sendEmail', jobsController.sendEmail)

module.exports = router