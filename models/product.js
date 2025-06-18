import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productName : String,
    price : Number,
    discount : {
        type : Number,
        default:0,
    },
    image : String,
    description : String,
})

const product = mongoose.model("product",productSchema);

export default product;   