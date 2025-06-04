const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  des: {
    type: String,
    require: true,
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
    require: true,
  },
});

module.exports = mongoose.model('Room', roomSchema) 