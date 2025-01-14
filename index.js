const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');

app.use(bodyParser.json());

let users = [
  { 
    id: 1,
    name: "Hannah",
    favoriteMovies: ["Dune: Part Two"]
  },
  { 
    id: 2,
    name: "Jochen",
    favoriteMovies: ["Ghostlight"]
  }
];

let movies = [
  {
    "Title":"Dune: Part Two",
    "Description":"A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    "Genre": {
      "Name":"Sci-Fi",
      "Description":"Science fiction is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology",
    },
    "Director": {
      "Name":"Denis Villeneuve",
      "Bio":"Denis Villeneuve is a French Canadian film director and writer. He was born in 1967, in Trois-Rivières, Québec, Canada. He started his career as a filmmaker at the National Film Board of Canada. He is best known for his feature films Arrival (2016), Sicario (2015), Prisoners (2013), Enemy (2013), and Incendies (2010). He is married to Tanya Lapointe.",
      "Birth":"1967.0"
    },
    "ImageURL":"https://www.imdb.com/title/tt15239678/mediaviewer/rm1391346433/?ref_=tt_ov_i",
  },
  {
    "Title":"The Brutalist",
    "Description":"When a visionary architect and his wife flee post-war Europe in 1947 to rebuild their legacy and witness the birth of modern United States, their lives are changed forever by a mysterious, wealthy client.",
    "Genre": {
      "Name":"Drama",
      "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
    },
    "Director": {
      "Name":"Brady Corbet",
      "Bio":"American actor Brady James Monson Corbet was born on August 17, 1988, in Scottsdale, AZ. Brady made his film debut as Mason Freeland in 2003's thirteen.",
      "Birth":"1988.0"
    },
    "ImageURL":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQxLQplL4otquzTgJfqv0vxFxYXC49zwUnuTWkb2iqi5dqWk5IF",
  },
  {
    "Title":"Ghostlight",
    "Description":"When a construction worker unexpectedly joins a local theater's production of Romeo and Juliet, the drama onstage starts to mirror his own life.",
    "Genre": {
      "Name":"Comedy",
      "Description":"Comedy is a genre that consists of discourses or works intended to be humorous or amusing by inducing laughter",
    },
    "Director": {
      "Name":"Kelly O'Sullivan",
      "Bio":"Kelly O'Sullivan (born 1983) is an American actress, screenwriter, director, and producer.",
      "Birth":"1983.0"
    },
    "ImageURL":"https://www.imdb.com/title/tt30321095/mediaviewer/rm3288822273/?ref_=tt_ov_i",
  },
];

// UPDATE
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

let user = users.find(user => user.id == id);

if (user) {
  user.name = updatedUser.name;
  res.status(200).json(user);
} else {
  res.status(400).send('no such user!')
}
})

// POST
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

let user = users.find(user => user.id == id);

if (user) {
  user.favoriteMovies.push(movieTitle); 
  res.status(200).send('Your movie has been added!');
} else {
  res.status(400).send('no such user!')
}
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

let user = users.find(user => user.id == id);

if (user) {
  user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
  res.status(200).send('Movie has been removed!');
} else {
  res.status(400).send('no such movie!')
}
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

let user = users.find(user => user.id == id);

if (user) {
users = users.filter(user => user.id != id);
res.status(200).send('user has been deleted');
} else {
  res.status(400).send('no such user!')
}
})

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('please enter a name')
  }
})

// READ
app.get('/movies/', (req, res) => {
res.status(200).json(movies)
})

app.get('/movies/:title', (req, res) => {
  const title = req.params.title;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie!')
  }
  })

  app.get('/movies/genre/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;
  
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('no such genre!')
    }
   
    })

    app.get('/movies/directors/:directorName', (req, res) => {
      const { directorName } = req.params;
      const director = movies.find(movie => movie.Director.Name === directorName).Director;
    
      if (director) {
        res.status(200).json(director);
      } else {
        res.status(400).send('no such director!')
      }
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