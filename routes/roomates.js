const { Router } = require('express')
const { getRooms, createRoom, singleRoom, updateRoom, deletRooms } = require('../controllers/roomControllers.js') 

const router = Router()


router.get('/', getRooms)
router.post("/", createRoom);
router.get('/:id', singleRoom)
router.put("/:id", updateRoom);
router.delete("/:id", deletRooms);


module.exports = router