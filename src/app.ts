import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import dbConnection from './config/db';
import { handleRoutes } from './routes/index'
import { globalError } from './middlewares/gloablError';
import limiter from './middlewares/rateLimiter';
import path from 'path';
// import cors from 'cors';

// env
const PORT = process.env.PORT || 3000;

// app
const app = express();

// app.use(cors());

dbConnection();

// Security
app.use(helmet());
app.disable("x-powered-by");

// Receiving JSON Data
app.use(express.json());

// const baseUploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
// app.use('/uploads/tasks/', express.static(path.join(baseUploadDir, 'images/tasks')));


app.use(limiter);
// call routes
handleRoutes(app);

// must be after all routes middleware for handle error
app.use(globalError);

// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit the process with failure
}

