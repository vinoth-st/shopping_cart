const express = require('express');
const Product = require('../models/Product');

exports.index = async(req,res) => {
    try {
        const products = await Product.find();
        res.render('home/products', { products });
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
      }
};
