const { Router } = require('express')
const { createBooking, getBooking, singleUserBooking, updateBooking, deleteBooking } = require('../controllers/bookingControllers')

const router = Router()

router.post("/", createBooking);
router.get("/", getBooking);
router.get("/:id", singleUserBooking);
router.put("/:id", updateBooking);
router.delete('/:id', deleteBooking)

module.exports = router