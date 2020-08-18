import React, { useEffect, useState, useLayoutEffect } from "react";
import MoviesPage from "components/movies";
import axios from "axios";
import { baseUrl } from "constants/index";
import { Loader } from "components/core/loader";

const MoviesContainer = () => {
  const [movies, setMovies] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [loading, setLoading] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    load();
    load("paginated", pageNum);
  }, [pageNum]);

  const [pages, setPages] = useState([]);
  const total = movies.length;
  const offset = 6;

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(total / offset); i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [total, offset, movies]);

  const [paginatedData, setPaginatedData] = useState([]);

  const paginate = (arr, page) => {
    const sliced = arr.length && arr.slice(offset * (page - 1), offset * page);
    setPaginatedData(sliced);
  };

  const load = (type, page) => {
    setLoading(1);
    return axios
      .get(`${baseUrl}/api/movies`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setLoading(0);

          switch (type) {
            case "sorted":
              paginate(
                res.data.sort((a, b) => {
                  return 1 * a.title.localeCompare(b.title);
                }),
                pageNum
              );
              setDefaultMovies(res.data);
              break;

            case "paginated":
              paginate(res.data.reverse(), page);
              break;

            default:
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

  const remove = (id) => {
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
        alert(err.message);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <MoviesPage
      pages={pages}
      data={movies}
      paginatedData={paginatedData}
      setPageNum={setPageNum}
      onSearch={search}
      onSort={sort}
      onDelete={remove}
    />
  );
};

export default MoviesContainer;
