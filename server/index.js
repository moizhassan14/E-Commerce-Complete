import express from "express";
import cors from 'cors';
import router from './routes/index.js';
import mongoose from "./db/index.js";
import chalk from "chalk";
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 8000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(chalk.blue.underline.bgGreenBright("db connected"));
});


app.use(express.json());
app.use(cors());

//routing
app.use('/api',router)



app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});

