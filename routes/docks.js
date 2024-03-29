const express = require('express')
const { addDock } = require('../controllers/docksController')

const router = express.Router()

router.post('/add-dock', addDock)

module.exports = router