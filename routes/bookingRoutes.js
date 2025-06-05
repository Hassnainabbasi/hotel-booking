const { Router } = require('express')
const { createBooking, getBooking, singleUserBooking, updateBooking, deleteBooking } = require('../controllers/bookingControllers');
const { auth } = require('../middleware/auth');

const router = Router()

router.post("/", auth, createBooking);
router.get("/", auth, getBooking);
router.get("/:id",auth, singleUserBooking);
router.put("/:id",auth, updateBooking);
router.delete('/:id',auth, deleteBooking)

module.exports = router