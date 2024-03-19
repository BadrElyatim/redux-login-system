require('dotenv').config()
const cors = require('cors')
require('./src/db')
const express = require('express')
const User = require('./src/models/User')
const validateUserPassword = require('./src/helpers/validateUserPassword')
const hashPassword = require('./src/helpers/hashPassword')
const generateAccessToken = require('./src/helpers/generateAccessToken')
const auth = require('./src/middlewares/auth')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', auth, (req, res) => {
    res.send('hello world')
})

app.post('/login', async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400).json({
            "message": "Invalid request"
        })
    }

    try {
        const user = await User.findOne({name, email});
        if (!user) {
            return res.status(403).json({message: "Invalid credentials"})
        }
        
        const isPasswordValid = await validateUserPassword(password, user.password)
        if (isPasswordValid) {
            return res.json({
                token: generateAccessToken({name, email, password}),
                name,
                email
            })
        }
        return res.status(403).json({message: "Invalid credentials"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }

})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            "message": "Invalid request"
        })
    }

    try {
        const hashedPassword = await hashPassword(password)
        const user = new User({name, email, password: hashedPassword}) 
        await user.save()
        
        return res.status(200).json({message: "User created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }

})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})