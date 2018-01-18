const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err) => {
    if(err) {
      console.log('Unable to append to server.log !');
    }
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
//routing to the root /
app.get('/', (request, respond) => {
  //below sent text data
  //respond.send('<h1>Hello express!</h1>');
  // respond.send({
  //   name : 'Aditya',
  //   age : 16,
  //   location : 'New York',
  //   likes :['soccer', 'softdev', 'machine learning']
  // });

  respond.render('home.hbs', {
    pageTitle: 'Home page',
    pageInfo : 'Welcome to the home page',
    //currentYear : new Date().getFullYear()
  });
});

app.get('/about', (req,res) => {
  //res.send('abouit pg');
  res.render('about.hbs', {
    pageTitle: 'About page',
    //currentYear : new Date().getFullYear()
  });
});

app.get('/bad' , (req,res) => {
  res.send({
      errorMessage : 'Unable to send request'
  });
});
app.listen(3000, () => {
  console.log('server is up and running on port 3000')
});
