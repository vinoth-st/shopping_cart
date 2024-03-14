const express = require('express');
const app = express();
const router = express.Router();

const Product = require('../models/Product');

const fs = require('fs');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


router.post('/products/add', upload.single('files'), async (req, res) => {
    
    const image = req.file.filename;
    
      try {
        await Product.create({ name, description, price, image });
        res.redirect('/products');
        await image.save();
        res.status(200).send('Image uploaded and saved successfully');
      } catch (error) {
        res.status(500).send('Error saving image to the database');
      }
});


exports.index = async(req,res) => {
    try {
        const products = await Product.find();
        res.render('products/index', { products });
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
      }
};

exports.add =  (req,res) => {
    res.render('products/add');
};

exports.store = async (req,res) => {
    try {
        console.log('body')
        console.log(req.body)
        const { name, description, price } = req.body;
        // Check if request has files
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // Get the uploaded file
        const image = req.files.image;

        // Move the uploaded file to a designated directory
        const uploadPath = path.join(__dirname, 'src', 'public', 'uploads', image.name);

        image.mv(uploadPath, (err) => {
            if (err) {
            return res.status(500).send(err);
            }

            // File uploaded successfully
            // res.send('File uploaded to: ' + uploadPath);
        });

        await Product.create({ name, description, price, image });
        res.redirect('/products');
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
      }
};

exports.edit = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('products/edit', { product });
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
      }
};

exports.update = async (req,res) => {
    try {
        const { name, description, price } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, description, price });
        res.redirect('/products');
      } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send('Internal Server Error');
      }
};

exports.delete = async (req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
      } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).send('Internal Server Error');
      }
};