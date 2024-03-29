const express = require('express')
const { createOrder, getOrders } = require('../controllers/orderController')

const router = express.Router()

router.post('/add-order', createOrder)
router.get('/by-user', getOrders)

module.exports = router