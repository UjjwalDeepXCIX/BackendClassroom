import express from "express";
import subjectsrouter from "./routes/subjects.js";
import cors from "cors"
const app = express();
const PORT = 8000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());

app.use('/api/subjects', subjectsrouter)
app.get('/', (req, res)=> {
    res.send('this is the beginning of backend api');
});

app.listen(PORT, ()=>{
    console.log(`Server is Serving at http://localhost:${PORT}`);

});