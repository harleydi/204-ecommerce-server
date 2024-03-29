const express = require('express')
const { createProduct, getAllProducts, editProduct, deleteProduct, insertFakerData, getLimitedProducts } = require('../controllers/inventoryController')
const { checkIsEmpty } = require('../utils/checkIsEmpty')


const router = express.Router()

router.post('/add-product',checkIsEmpty, createProduct)
router.post('/insert', insertFakerData)
router.get('/all', getAllProducts)
router.get('/all/limit', getLimitedProducts)
router.put('/edit-product/:id', editProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router