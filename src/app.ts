import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import dbConnection from './config/db';
import { handleRoutes } from './routes/index'
import { globalError } from './middlewares/gloablError';
import limiter from './middlewares/rateLimiter';
import logMiddleware from './middlewares/log';
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


// Trust the first proxy (Nginx)
app.set('trust proxy', 1);

// Receiving JSON Data
app.use(express.json());


app.use(limiter);

app.use(logMiddleware);

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

