const express = require('express');
const app = express();
const morgan = require('morgan'),
fs = require('fs'), 
path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let topMovies = [
    {
      title: 'Dune: Part Two',
      director: 'Denis Villeneuve'
    },
    {
      title: 'The Brutalist',
      director: 'Brady Corbet'
    },
    {
      title: 'Ghostlight',
      director: 'Kelly Sullivan'
    },
    {
        title: 'Nosferatu',
        director: 'Robert Eggers'
      },    
      {
        title: 'The Wild Robot',
        director: 'Chris Sanders'
      },
      {
        title: 'Furiosa: A Mad Max Saga',
        director: 'George Miller'
      },
      {
        title: 'The Substance',
        director: 'Coralie Fargeat'
      },
      {
        title: 'A Real Pain',
        director: 'Jesse Eisenberg'
      },
      {
        title: 'His Three Daughters',
        director: 'Azazel Jacobs'
      },
      {
        title: 'Conclave',
        director: 'Edward Berger'
      }
  ];
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

  app.use('/documentation.html', express.static('public'));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });