import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import morgan from 'morgan';

const app = express();

app.use(cors());

// enable morgan logs only in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// enable use of dotenv config file.
dotenv.config();

// Connect to MongoDB
connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());

// Handling unavailable routes
app.all('*', (req, res) =>
  res.status(405).json({
    error: 'Method not allowed',
  }),
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
