const express = require('express')
const connectDB = require('./config/db')

const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.json("hii")
})
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is currently running on 3000`)
})

