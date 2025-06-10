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
  console.log("ROOM DATA:", req.body);
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
  try {
    const deletRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getRooms,
  createRoom,
  singleRoom,
  updateRoom,
  deletRooms,
};
