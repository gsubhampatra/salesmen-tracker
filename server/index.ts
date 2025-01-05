import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/routes';
import { corsOptions } from './lib/cors/cors';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});