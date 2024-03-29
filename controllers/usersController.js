const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const userInput = {
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName
        }
        const response = await new User(userInput)
        await response.save()
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
            res.status(500).json({ success: false, message: "User Not Found"})
        }
        const checkPw = await bcrypt.compare(password, foundUser.password)
        if (!checkPw) {
            res.status(500).json({ success: false, message: "Passwords do not match!"})
        }
        const token = jwt.sign({ userID: foundUser._id}, process.env.SECRET_KEY, { expiresIn: '1hr'})
        res.status(200).json({ success: true, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const verifyUser = async (req, res) => {
    try {
        const decodedToken = res.locals.decodedToken
        const foundUser = await User.findOne({ _id: decodedToken.userID})
        if (!foundUser) {
            return res.status(400).json({ success: false, email: { user: "User not found"} })
        }
        res.status(200).json({ success: true, data: foundUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}

const getUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(500).json({ success: false, message: "user not found" })
        }
        res.status(200).json({ success: true, data: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "error", error: error })
    }
}


module.exports = {
    register,
    loginUser,
    verifyUser,
    getUser
}