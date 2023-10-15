const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Masukan nama Produk"]
        },
        quantity: {
            type : Number,
            required: true,
            default: 0
        },
        desc: {
            type: String,
            required: true

        },
        price: {
            type: Number,
            required: true

        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model('Product', productSchema);

module.exports = Product;