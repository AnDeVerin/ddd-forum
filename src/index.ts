import express from 'express';
import userRoutes from './routes/userRoutes';
import { handleError } from './middlewares/errorMiddleware';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
