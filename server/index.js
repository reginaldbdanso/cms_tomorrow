import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import postRoutes from './routes/posts.js';
// import blogRoutes from './routes/blogRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Increase the limit for JSON Payloads
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors({
  origin: [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2],
}));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use('/api/posts', postRoutes);
// app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));


