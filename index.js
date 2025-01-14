const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const FormData = require('./models/formData')
require('dotenv').config()

const app = express();
// MiddleWare

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images' , express.static('public/images'))
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
    
    if (!fname || !lname || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required!' });
  }
    await FormData.create({fname, lname, email, phone, message})
    res.status(201).json({message: 'Form submitted successfully'})
  } catch (error) {
    res.status(500).json({message: 'Server error. Please try again'})
    console.log(error)
  }
    
})

app.listen(5500,()=>{
    console.log('Server is running on port 5500')
})