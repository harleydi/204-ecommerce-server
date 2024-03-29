const mongoose = require('mongoose')
const { v4 : uuid } = require('uuid')

const orderSchema = new mongoose.Schema({
    _id: { type: String, default: uuid },
    orderOwner: { type: String, ref: "user" },
    orderTotal: { type: Number },
    orderItems: [{ type: Object, ref: "product" }],
    orderDock: { type: String, ref: "dock", default: "1547169e-52f6-4a33-a5c7-758af56caa5f" }, // Should I make this to enum? How can i make this to keep up with active docks?
    orderStatus: { type: String,  enum: ['order recieved', 'order being prepared', 'order ready for pick', 'order complete'], default: 'order recieved'}
})

const Order = mongoose.model("order", orderSchema)
module.exports = Order