import Post from "../models/Post";

const getPost =  async (req,res,next) => {
    try {
        res.json(
            await Post.find()
              .populate('author', ['username'])
              .sort({createdAt: -1})
              .limit(20)
          );
    } catch(err) {
        next(err);
    }
  }

export default getPost;