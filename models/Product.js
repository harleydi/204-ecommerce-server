const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const defaultImage = 'https://e0.pxfuel.com/wallpapers/771/37/desktop-wallpaper-default-baseball-cap-pfp-cute-instagram-fitted-hats-icon-thumbnail.jpg'

const productSchema = new mongoose.Schema({
    _id: { type: String, default: uuid },
    name: { type: String, unique: true, required: true },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    quatity: { type: Number, default: 10 },
    image: { type: String, default: defaultImage }
})

const Product = mongoose.model("product", productSchema)
module.exports = Product