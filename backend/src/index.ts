import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';
import { handleError } from './middlewares/errorMiddleware';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
