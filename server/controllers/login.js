import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userDoc = await User.findOne({ username });
        const passOk = await bcrypt.compare(password, userDoc.password);
        if (passOk) {
            // logged in
            const token = jwt.sign( { username, id: userDoc._id }, process.env.JWT);
            const user = {id: userDoc._id,username}
            res.status(200).json({user , token});
        } else {
            next(createError(400,'wrong credentials'))
        }
    } catch (err) {
        next(err);
    }
}

export default login;