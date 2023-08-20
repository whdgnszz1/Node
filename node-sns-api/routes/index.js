const express = require('express')
const router = express.Router()
const {renderMain} = require('../controllers/index')

router.get('/', renderMain)


module.exports = router