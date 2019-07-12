const router = require('express').Router()
const weatherController = require('../controllers/weatherController')

router.get('/:lat/:lng', weatherController.getWeathers)
router.get('/:lat/:lng/:y/:m/:d', weatherController.getForecast)

module.exports = router