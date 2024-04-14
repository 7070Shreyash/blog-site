import User from "../models/User";
import bcrypt from "bcrypt";

const register = () => async (req,res,next) => {
    const {username,password} = req.body;
    try{
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const userDoc = await User.create({
        username,
        password:passwordHash
      });
      res.json(userDoc);
    } catch(err) {
      next(err)
    }
  };

export default register;