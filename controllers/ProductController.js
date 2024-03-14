const express = require('express');
const Product = require('../models/Product');

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
        const { name, description, price } = req.body;
        await Product.create({ name, description, price });
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