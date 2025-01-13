const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const FormData = require('./models/formData')
require('dotenv').config()

const app = express();
// MiddleWare

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images' , express.static('public/images'))
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log(err)
})


// Route
app.post('/submit-form', async(req, res) => {
   
  try {
    const {fname, lname, email, phone, message} = req.body
    await FormData.create({fname, lname, email, phone, message})
    res.status(201).json({message: 'Data Recieved'})
  } catch (error) {
    res.status(500).json({message: 'Error recieving data'})
    console.log(error)
  }
    
})

app.listen(5500,()=>{
    console.log('Server is running on port 5500')
})