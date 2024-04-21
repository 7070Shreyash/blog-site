import User from "../models/User.js";
import bcrypt from "bcrypt";

const register =  async (req,res,next) => {
    try{
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const userDoc = new User({
          username,
          password:passwordHash
        })
        const newUser = await userDoc.save();
        res.status(200).json(newUser);
    } catch(err) {
      next(err)
    }
  };

export default register;