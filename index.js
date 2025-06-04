const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const roomRoutes = require('./routes/roomates')
const bookingRoutes = require('./routes/bookingRoutes')
const { errormiddleware } = require("./middleware/errormiddleware")

const port = process.env.PORT || 3000

app.use(express.json());

app.use('/api/rooms', roomRoutes)
app.use("/api/booking", bookingRoutes);

app.use(errormiddleware)
connectDb()

app.listen(port, ()=> console.log(`listing on Port${port}`))