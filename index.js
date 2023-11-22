const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Product = require('./models/productModel')
const dotenv = require('dotenv').config();
const app = express()
const connectDB = require('./connectMongo')
const PORT = process.env.PORT

connectDB();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  })

app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//rute
app.get('/', (req, res) => {
    res.send('Hello World ONLINE!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog!')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    // console.log(req.body);
    // res.send(req.body)
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product  = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json({message: `Products Tidak Ditemukan ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `Produk Tidak Ditemukan ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false)
app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
// mongoose
// .connect('mongodb+srv://Kens0day:kens0day@cluster0.rtupcjj.mongodb.net/Node-API?retryWrites=true&w=majority')
// // mongoose.connect('mongodb://localhost:27017/Node-API')
// .then(() => {
//     console.log("Connected to MongoDB!")
//     app.listen(3000, () => {
//         console.log("Server is running on port 3000")
//     });
// }).catch((error) => [
//     console.log(error)
// ])

// const connectDB = async () => {
//     try {
//         mongoose.set("strictQuery", false)
//         mongoose.connect(DB_URI).then(() => {
//             console.log("Connected to MongoDB!")
//             app.listen(3000, () => {
//                 console.log("Server is running on port 3000")
//             });
//         }).catch((error) => [
//             console.log(error)
//         ])
  
//     //   console.log('MongoDB Connected...');
//     } catch (err) {
//       console.error(err.message);
//       // Exit process with failure
//       process.exit(1);
//     }
//   };

//   module.exports = connectDB;
