const Room = require("../models/roomModel.js");

const getRooms = async (req, res) => {
  const room = await Room.find();

  if (!room) {
    res.status(400);
    throw new Error("there was a problem creating");
  }

  res.status(200).json(room);
};

const createRoom = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    const newRoom = new Room(req.body);
    const room = await newRoom.save();
    if (!room) {
      res.status(400);
      throw new Error("rooms cannot create");
    }
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
  }
};

const singleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("room are not available");
    }
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updateRooms = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateRooms) {
      res.status(400);
      throw new Error("updateroom are not available");
    }
    res.status(201).json(updateRooms);
  } catch (error) {
    console.log(error);
  }
};

const deletRooms = async (req, res) => {
  const deletRoom = await Room.findByIdAndDelete(req.params.id)
  if (!deletRoom) {
    res.status(400);
    throw new Error("Room are not delete");
  }
  res.status(201).json(deletRoom);
};

module.exports = {
  getRooms,
  createRoom,
  singleRoom,
  updateRoom,
  deletRooms
};
