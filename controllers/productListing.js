import Product from '../models/product.js';


const ListProducts = async (req, res) => {
    const {productName, price, discount} = req.body;

    const image = req.file ? req.file.filename : null;

    try{
        let products = await Product.create({
            productName,
            price,
            discount,  
            image
        })
        res.redirect("/products");
    }catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
export default ListProducts;