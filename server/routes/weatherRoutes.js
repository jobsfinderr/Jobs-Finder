const router = require('express').Router()
const weatherController = require('../controllers/weatherController')

router.get('/:lat/:lng', weatherController.getWeathers)

module.exports = router