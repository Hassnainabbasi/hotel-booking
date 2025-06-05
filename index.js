const express = require("express")
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const roomRoutes = require('./routes/roomates')
const bookingRoutes = require('./routes/bookingRoutes')
const userRoutes = require('./routes/userRoutes')
const { errormiddleware } = require("./middleware/errormiddleware")
const { auth } = require("./middleware/auth")

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())

app.use('/api/rooms', roomRoutes)
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/auth", auth);



app.use(errormiddleware)
connectDb()

app.listen(port, ()=> console.log(`listing on Port${port}`))