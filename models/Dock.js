const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

let totalDocks = 0
const addDocks = () => {
    totalDocks += 1
    return totalDocks
}

const dockSchema = new mongoose.Schema({
    _id: { type: String, default: uuid },
    dockNumber: { type: String, default: addDocks },
    orders: [{ type: String, ref: "order"}]
})

const Dock = mongoose.model("dock", dockSchema)
module.exports = Dock
