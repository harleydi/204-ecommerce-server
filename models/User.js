const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const userSchema = new mongoose.Schema({
    _id: { type: String, default: uuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, trim: true, unique: true },
    password: { type: String, required: true},
    orders: [{ type: String }],
    roles: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now()}
})

const User = mongoose.model("user", userSchema)
module.exports = User