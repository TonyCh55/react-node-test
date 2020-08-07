import React from "react";
import { Layout } from "components/core/layout";
import { Switch, Route, Redirect } from "react-router-dom";
import MoviesContainer from "containers/movies/index";
import AddMovieContainer from "containers/movies/add";
import MovieContainer from "containers/movies/movie-page";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/movies/:id" component={MovieContainer} />
        <Route path="/movies" component={MoviesContainer} />
        <Route path="/add" component={AddMovieContainer} />
        <Redirect from="/" to="/movies" />
      </Switch>
    </Layout>
  );
}

export default App;
