const express = require('express');

const app = express();
/*
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien  été reçue !' }); 
 });
 */

 app.use('/api/users', (req, res, next) => {
    const stuff = [
      {
        _id: '1',
        profile: 'garandv',
        fullNqme: 'Vincent Garand',
        pwd: 'xwcxwiopdfdpfkjee',        
      },
      {
        _id: '2',
        profile: 'leroiv',
        fullNqme: 'Véronique Leroi',
        pwd: 'uazezphjqdzai',        
      },
    ];
    res.status(200).json(stuff);
  });

  app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
 
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue BIS !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });

module.exports = app;