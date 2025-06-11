const { Router } = require("express");
const {
  createBooking,
  getBooking,
  singleUserBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingControllers");
const { auth } = require("../middleware/auth");

const router = Router();

router.post("/", createBooking);
router.get("/", getBooking);
router.get("/:id", singleUserBooking);
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;
