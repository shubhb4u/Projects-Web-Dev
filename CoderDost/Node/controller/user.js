const fs = require('fs');
// const express = require('express');

const index = fs.readFileSync('index.html', 'utf-8');
const data  = JSON.parse(fs.readFileSync('data.json','utf-8'));
const users = data.users;


exports.getAllProducts = (req,res) => {
    res.json(users);
};

exports.getProduct = (req,res) => {
    const id  = +req.params.id;
    const product = users.find(p => p.id===id);
    res.json(product);
};

exports.createProduct = (req,res) => {
    users.push(req.body);
    res.json(req.body);
};

exports.replaceProduct = (req, res) => {
    // console.log(req.params.id);
    const id = +req.params.id;
    const productIndex = users.findIndex(p => p.id === id);
    users.splice(productIndex, 1, {...req.body, id:id});
    res.status(201).json();
};

exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = users.findIndex(p => p.id === id);
    const prod = users[productIndex];
    users.splice(productIndex, 1, {...prod, ...req.body});
    res.status(201).json();
};

exports.deleteProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = users.findIndex(p => p.id === id);
    const deletedprod = users[productIndex];
    users.splice(productIndex, 1);
    res.status(201).json(deletedprod);
};