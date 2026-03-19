import express from "express";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (req, res)=> {
    res.send('this is the beginning of backend api');
});

app.listen(PORT, ()=>{
    console.log(`Server is Serving at http://localhost:${PORT}`);

});