import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  }),
);

// routes
app.use('/api/v1/students', StudentRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Lens Legacy server is running');
});

export default app;
