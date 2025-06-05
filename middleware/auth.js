const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "not authenticate" });
    }
    const data = jwt.verify(token, process.env.JWT_SEC);
    const user = await User.findById(data.id);
    
    if(!user){
        return res.status(400).json({ message : "invalid user" })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async(req, res, next) => {
   res.cookie('jwt'," ",{expiresIn : "-1"})
   return res.json({ message: "logout user" });

}

module.exports = {
  auth,
};
