const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genre = Models.Genre;
const Directors = Models.Director

mongoose.connect('mongodb://localhost:27017/myflixDB') /*, { 
useNewUrlParser: true, useUnifiedTopology: true });*/

// UPDATE
// UPDATE USER INFO BY USERNAME
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, 
    { 
      $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true })
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

// !UPDATE A FAVOURITE MOVIE
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username}, {
      $push: { FavouriteMovies: req.params.MovieID }
  },
  { new: true })
  .then((updatedUser) => {
      res.json(updatedUser);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });   
});


// DELETE
//!DELETE A FAVOURITE MOVIE
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true })
  .then((updatedUser) => {
      res.json(updatedUser);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
  });
})

// DELETE A USER BY USERNAME
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndDelete({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// CREATE
//CREATE NEW USER
app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user); 
          })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// READ
// GET ALL MOVIES
app.get('/movies/', (req, res) => {
  Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  })

// GET ALL USERS
app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET USER BY USERNAME
app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET MOVIE BY TITLE
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

  //GET GENRE BY GENRE NAME
  app.get('/movies/genre/:genre', async (req, res) => {
    const genreName = req.params.name.trim().toLowerCase(); // Cleaned-up genre name from URL
    await Movies.find({
        'genre.name': {
          $regex: new RegExp(genreName, 'i')
        }
      })
    .then((movie) => {
        res.json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

    //!GET DIRECTOR BY NAME
    app.get('/movies/directors/:directorName', async (req, res) => {
      const directorName = req.params.name.trim().toLowerCase(); // Cleaned-up director name from URL
      await Movies.findOne({
          'director.name': {
            $regex: new RegExp(directorName, 'i')
          }
        }) 
      .then((movie) => {
          res.json(movie.director);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      })
  })

const morgan = require('morgan'),
fs = require('fs'), 
path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

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