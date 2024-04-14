import Post from "../models/Post";
   
const getSpecificPost =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const postDoc = await Post.findById(id).populate('author', ['username']);
        res.json(postDoc);
    } catch(err) {
        next(err);
    }
  }

  export default getSpecificPost;