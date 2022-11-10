require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json()); // Express ne peut pas lire les corps de requête JSON par défaut... Pour que cela fonctionne, nous devons utiliser un middleware express intégré : express.json(). Modifie le code de ton fichier

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", movieHandlers.postUsers);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
