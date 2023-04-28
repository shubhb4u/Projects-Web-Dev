const fs = require('fs');
// const express = require('express');

const index = fs.readFileSync('index.html', 'utf-8');
const data  = JSON.parse(fs.readFileSync('data.json','utf-8'));
const products = data.products;


exports.getAllProducts = (req,res) => {
    res.json(products);
};

exports.getProduct = (req,res) => {
    const id  = +req.params.id;
    const product = products.find(p => p.id===id);
    res.json(product);
};

exports.createProduct = (req,res) => {
    products.push(req.body);
    res.json(req.body);
};

exports.replaceProduct = (req, res) => {
    // console.log(req.params.id);
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1, {...req.body, id:id});
    res.status(201).json();
};

exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const prod = products[productIndex];
    products.splice(productIndex, 1, {...prod, ...req.body});
    res.status(201).json();
};

exports.deleteProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const deletedprod = products[productIndex];
    products.splice(productIndex, 1);
    res.status(201).json(deletedprod);
};