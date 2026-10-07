import React from "react";

function FilmCard({ film }) {
  const statusClass = film.status
    ? film.status.toLowerCase().replace(/\s+/g, "-")
    : "unknown";

  return (
    <article className="film-card">

      <div className="film-card-top">

        <div className="film-poster">
          <span>🎞️</span>
        </div>

        <div className="film-heading">
          <h3>{film.title}</h3>
          <p>{film.genre || "Genre not specified"}</p>
        </div>

      </div>

      <div className="film-details">

        <div className="detail-row">
          <span className="detail-label">Director</span>
          <span>{film.director}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Release Date</span>

          <span>
            {film.release_date
              ? new Date(film.release_date).toLocaleDateString()
              : "Not set"}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">
            Production Status
          </span>

          <span className={`status-badge ${statusClass}`}>
            {film.status}
          </span>
        </div>

      </div>

    </article>
  );
}

export default FilmCard;