import express from 'express';
import api from "./routes/api.js";
import cors from 'cors';
import database from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);


app.listen(3000, () => {
    database();
    console.log('App berjalan di http://localhost:3000');
});