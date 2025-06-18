import mongoose from 'mongoose';

const vendorSchema = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    contact : Number,
    orders: {
        type:Array,
        default:[],
    },
})

const vendor  = mongoose.model("vendor",vendorSchema);

export default vendor;