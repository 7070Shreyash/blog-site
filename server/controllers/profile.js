import jwt from "jsonwebtoken";

const profile = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const info = jwt.verify(token, process.env.JWT);
        res.json(info);
    } catch (err) {
        next(err);
    }
}

export default profile;
