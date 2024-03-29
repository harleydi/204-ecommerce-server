const { name } = require('ejs')
const Product = require('../models/Product')


const createProduct = async (req, res) => {
    try {
        const productData = req.body
        const newProduct = await new Product(productData)
        await newProduct.save()
        res.status(200).json({ success: true, data: newProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const insertFakerData = async (req, res) => {
    try {
        const fakerURL = process.env.FAKER_BASEURL
        const fakerResponse = await fetch(`${fakerURL}/products`)
        const fakerData = await fakerResponse.json()
        const data = fakerData.map((item) => {
            const name = item.title
            const price = item.price
            const description = item.description
            const category = item.category
            const image = item.image
            return { name, price, description, category, image }
        })
        const response = await Product.insertMany(data)
        res.status(200).json({ success: true, data: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const getLimitedProducts = async (req, res) => {
    try {
        const page = req.query.page
        const products = await Product.find({}).limit(9).skip(9 * page)
        res.status(200).json({ success: true, data: products})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const productEdit = await Product.findOneAndUpdate({ _id: id }, req.body)
        res.status(200).json({ success: true, data: productEdit })
    } catch (error) {
        
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deltedProduct = await Product.findOneAndDelete({ _id: id }) 
        res.status(200).json({ success: true, message: "product deleted", data: deltedProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

module.exports = {
    createProduct,
    insertFakerData,
    getAllProducts,
    getLimitedProducts,
    editProduct,
    deleteProduct
}