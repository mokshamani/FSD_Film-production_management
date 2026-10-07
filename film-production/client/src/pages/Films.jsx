import React from "react";
import { useEffect, useMemo, useState } from "react";
import FilmCard from "../components/FilmCard";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/films";

function Films() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch films.");
        }

        return response.json();
      })
      .then((data) => {
        setFilms(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load films. Please check the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredFilms = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return films;
    }

    return films.filter((film) =>
      [
        film.title,
        film.genre,
        film.director,
        film.status
      ]
        .filter(Boolean)
        .some((value) =>
          value.toLowerCase().includes(search)
        )
    );
  }, [films, searchTerm]);

  return (
    <div className="films-page">

      <section className="page-header">
        <div>
          <p className="eyebrow">PROJECT LIBRARY</p>

          <h1>All Films</h1>

          <p>
            View and search all film production projects.
          </p>
        </div>

        <Link to="/add-film" className="primary-button">
          + Add Film
        </Link>
      </section>

      <section className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search by title, genre, director or status..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ×
            </button>
          )}
        </div>

        <p className="result-count">
          {filteredFilms.length}{" "}
          {filteredFilms.length === 1 ? "film" : "films"} found
        </p>
      </section>

      {loading && (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading films...</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!loading && !error && filteredFilms.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎬</div>

          <h2>
            {searchTerm
              ? "No films found"
              : "No films added yet"}
          </h2>

          <p>
            {searchTerm
              ? "Try using a different search term."
              : "Add your first film project to get started."}
          </p>

          {!searchTerm && (
            <Link
              to="/add-film"
              className="primary-button"
            >
              Add Your First Film
            </Link>
          )}
        </div>
      )}

      {!loading && !error && filteredFilms.length > 0 && (
        <section className="films-grid">
          {filteredFilms.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
            />
          ))}
        </section>
      )}

    </div>
  );
}

export default Films;