const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const database = require("./database");

const getMovies = (req, res) => {
    database
      .query("select * from movies")
      .then(([movies]) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from movies where id = ?", [id])
      .then(([movies]) => {
        if (movies[0] != null) {
          res.json(movies[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };


  const getUsers = (req, res) => {
    database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

  };


  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };



// METHODE POSTE --------------------------------------------------------------------------------------------------------

const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", // remplacer par le module mysql2
        [title, director, year, color, duration]
      )
      .then(([result]) => { // c'est là que nous obtenions précédemment les lignes sélectionnées lors de l'exécution d'une requête SELECT
        res.location(`/api/movies/${result.insertId}`).sendStatus(201); // https://www.restapitutorial.com/lessons/httpmethods.html
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  };
    

  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", // remplacer par le module mysql2
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => { // c'est là que nous obtenions précédemment les lignes sélectionnées lors de l'exécution d'une requête SELECT
        res.location(`/api/users/${result.insertId}`).sendStatus(201); // https://www.restapitutorial.com/lessons/httpmethods.html
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the Users");
      });
  };


// UPDATE  ------------------------------------------------------------------------------

  const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
        [title, director, year, color, duration, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the movie");
      });
  };



  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language  } = req.body;
  
    database
      .query(
        "update users set firstname = ?, lastname= ?, email = ?, city = ?, language = ? where id = ?",
        [firstname, lastname, email, city, language, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the movie");
      });
  };


  // DELETE ---------------------------------------------------------------------------------------------------------------

  const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from movies where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  };


  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("delete from users where id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  };


module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
  postMovie,
  postUsers,
  updateMovie,
  updateUser,
  deleteMovie,
  deleteUser,
};
