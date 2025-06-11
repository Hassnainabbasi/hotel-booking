const express = require("express")
const cookieParser = require('cookie-parser')
const app = express()
const dotenv = require('dotenv').config()
const connectDb = require('../config/db')
const roomRoutes = require('../routes/roomates')
const bookingRoutes = require('../routes/bookingRoutes')
const userRoutes = require('../routes/userRoutes')
const { errormiddleware } = require("../middleware/errormiddleware")
const { auth } = require("../middleware/auth")
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
  

app.use('/api/rooms', roomRoutes)
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/auth", auth);



app.use(errormiddleware)
connectDb()

app.listen(port, ()=> console.log(`listing on Port${port}`))