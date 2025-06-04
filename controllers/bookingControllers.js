const Booking = require("../models/bookingModel");

const createBooking = async (req, res, next) => {
  try {
    const booker = await Booking.create(req.body);
    if (!booker) {
      res.status(400);
      throw new Error("Booking are not available");
    }
    res.status(201).json(booker);
  } catch (error) {
    console.log(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booker = await Booking.find();
    if (!booker) {
      res.status(400);
      throw new Error("Booking are not available");
    }
    res.status(201).json(booker);
  } catch (error) {
    console.log(error);
  }
};

const singleUserBooking = async(req, res, next)=>{
    try{
        const booker = await Booking.findById(req.params.id)
        if (!booker) {
          res.status(400);
          throw new Error("BookingId are not available");
        }
        res.status(201).json(booker);
    }
    catch(err){
        console.log(err)
    }
}

const updateBooking = async(req, res, next) =>{
    try {
     const booker = await Booking.findByIdAndUpdate(
        req.params.id,
        {
            $set : req.body
        },
        { new : true }
    )
    if (!booker) {
      res.status(400);
      throw new Error("BookingUpdateId are not available");
    }
    res.status(201).json(booker);
    } catch (error) {
      console.log(error)
    }
}

const deleteBooking = async(req, res, next)=>{
    const booker = await Booking.findByIdAndDelete(req.params.id)
    if (!booker) {
      res.status(400);
      throw new Error("BookingUpdateId are not available");
    }
    res.status(201).json(booker);
}

module.exports = {
  createBooking,
  getBooking,
  singleUserBooking,
  updateBooking,
  deleteBooking
};
