const mongoose = require ('mongoose')

const formSchema = mongoose.Schema ({
    fname: {
        type: String,
        required: true
    },
    lname : { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    message: {
        type: String,
        required: true
    }
})

const Form = mongoose.model('FormData' , formSchema)
module.exports = Form;