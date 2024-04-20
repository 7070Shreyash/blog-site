import Post from "../models/Post.js";
import fs from "fs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";

const putPost = async (req,res,next) => {
    try {
      let newPath = null;
      if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
      const {token} = req.cookies;
      const info =  jwt.verify(token, process.env.JWT);
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

      if (!isAuthor) {
        next(createError(400,'you are not the author'))
      }
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title , summary , content , cover : newPath ? newPath : postDoc.cover},
        {new : true}
      )

      res.json(updatedPost);
    } catch(err) {
        next(err);
    }
  }

  export default putPost;