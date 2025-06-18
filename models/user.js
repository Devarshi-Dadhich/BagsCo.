import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullname : {
        type: String,
        required: true,
        minlength: 3,
    },
    email : String,
    password : {
        type: String,
        required: true,
        minlength: 6,
    },
    contact : Number,
    cart : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    orders: {
        type:Array,
        default:[],
    },
})

const user  = mongoose.model("user",userSchema);

export default user;