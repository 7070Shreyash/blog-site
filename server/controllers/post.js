import Post from "../models/Post";
import fs from "fs";
import jwt from "jsonwebtoken";

const post =  async (req,res,next) => {
    try {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const { token } = req.cookies;
    const info = jwt.verify(token, process.env.JWT);
    const { title , summary , content } = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    } catch(err) {
        next(err);
    }
  }

  export default post;