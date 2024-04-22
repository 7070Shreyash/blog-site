import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import register from "./controllers/register.js"
import login from "./controllers/login.js";
import post from "./controllers/post.js";
import getPost from "./controllers/getPost.js";
import getSpecificPost from "./controllers/getSpecificPost.js";
import putPost from "./controllers/putPost.js";
import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
const uploadMiddleware = multer({ dest: 'uploads/' });

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors({
  credentials:true,
  origin:['https://main--blog-site-frontend.netlify.app/', 'http://localhost:3000'],
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.post('/login', login);
app.post('/register', register);
app.post('/post', uploadMiddleware.single('file'), post);
app.get('/post', getPost);
app.get('/post/:id', getSpecificPost)
app.put('/post',uploadMiddleware.single('file'), putPost);
  

// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

// Connections

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));





