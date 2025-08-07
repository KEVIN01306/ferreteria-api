import express from 'express';


const app = express();

const PORT = 5000

app.get('/',(req,res) => {
    res.json({ message: "Que tal"})
})

app.use(express.json());


app.listen(PORT, () => console.log('Hola'))

