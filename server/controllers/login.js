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
            res.cookie('token', token).json({id: userDoc._id,username});
        } else {
            next(createError(400,'wrong credentials'))
        }
    } catch (err) {
        next(err);
    }
}

export default login;