const { Router } = require('express')
const { createUser, getUser, singleUserUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = Router()

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/",auth,  getUser);
router.get("/logout", logoutUser);
router.get("/:id", auth, singleUserUser);
router.put("/:id", auth, updateUser);
router.delete('/:id', auth, deleteUser)

module.exports = router