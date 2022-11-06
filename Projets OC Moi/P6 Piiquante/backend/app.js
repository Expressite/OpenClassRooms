const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');

 //cette ligne permet de récupérer le corps de la requête pour les mettre 
 //à disposition dans la variable req.body
app.use(express.json());

//let requests from different ports
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));
//use users router
app.use('/api/auth', userRoutes);
//use sauce router
app.use('/api/sauces', sauceRoutes);

module.exports = app;