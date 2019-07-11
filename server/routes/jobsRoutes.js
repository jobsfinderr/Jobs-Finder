const router = require('express').Router()
const jobsController = require('../controllers/jobController')

router.get('/', jobsController.getListJobs)

module.exports = router