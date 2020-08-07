import React, { useEffect, useState } from "react";
import MoviesPage from "components/movies";
import axios from "axios";
import { baseUrl } from "constants/index";
import { Loader } from "components/core/loader";

const MoviesContainer = () => {
  const [movies, setMovies] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    load();
  }, []);

  const load = (sorted) => {
    return axios
      .get(`${baseUrl}/api/movies`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setLoading(0);

          if (sorted === "sorted") {
            setMovies(
              res.data.sort((a, b) => {
                return 1 * a.title.localeCompare(b.title);
              })
            );
            setDefaultMovies(res.data);
          } else {
            setMovies(res.data.reverse());
            setDefaultMovies(res.data);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
        setLoading(0);
      });
  };

  const search = (str) => {
    const filtered = movies.filter(
      (el) =>
        el.title.toLowerCase().includes(str.toLowerCase()) ||
        el.stars.toLowerCase().includes(str.toLowerCase())
    );

    if (!str) {
      return setMovies(defaultMovies);
    }

    return setMovies(filtered);
  };

  const sort = () => {
    setLoading(1);
    load("sorted");
  };

  const remove = (e, id) => {
    e.preventDefault();
    setLoading(1);

    return axios
      .delete(`${baseUrl}/api/movies/${id}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          load();
        }
      })
      .catch((err) => {
        setLoading(0);
        console.log(err);
        alert(e.message);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <MoviesPage
      data={movies}
      onSearch={search}
      onSort={sort}
      onDelete={remove}
    />
  );
};

export default MoviesContainer;
