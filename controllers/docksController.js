const Dock = require('../models/Dock')

const addDock = async (req, res) => {
    try {
        const newDock = await new Dock(req.body)
        await newDock.save()
        res.status(200).json({ success: true, data: newDock })
    } catch (error) {
        console.log(error)
        res.status(200).json({ success: false, message: "error", error: error })
    }
}

module.exports = {
    addDock
}