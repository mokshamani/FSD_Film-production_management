import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/films";

function Dashboard() {
  const [films, setFilms] = useState([]);
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
        setError("Unable to connect to the server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalFilms = films.length;

  const preProduction = films.filter(
    (film) => film.status === "Pre-Production"
  ).length;

  const shooting = films.filter(
    (film) => film.status === "Shooting"
  ).length;

  const postProduction = films.filter(
    (film) => film.status === "Post-Production"
  ).length;

  const completed = films.filter(
    (film) => film.status === "Completed"
  ).length;

  return (
    <div className="dashboard-page">

      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">FILM PRODUCTION MANAGEMENT</p>

          <h1>
            Manage your films
            <br />
            from idea to release.
          </h1>

          <p className="hero-description">
            Keep track of your film projects, directors,
            release dates and production status in one place.
          </p>

          <div className="hero-actions">
            <Link to="/add-film" className="primary-button">
              + Add New Film
            </Link>

            <Link to="/films" className="secondary-button">
              View All Films
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="clapperboard">
            <div className="clapper-top">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="clapper-body">
              <span>🎬</span>
              <p>FILM</p>
              <small>PRODUCTION</small>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">

        <div className="stat-card">
          <span className="stat-icon">🎬</span>
          <div>
            <p>Total Films</p>
            <h2>{loading ? "..." : totalFilms}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📝</span>
          <div>
            <p>Pre-Production</p>
            <h2>{loading ? "..." : preProduction}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🎥</span>
          <div>
            <p>Shooting</p>
            <h2>{loading ? "..." : shooting}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✂️</span>
          <div>
            <p>Post-Production</p>
            <h2>{loading ? "..." : postProduction}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <p>Completed</p>
            <h2>{loading ? "..." : completed}</h2>
          </div>
        </div>

      </section>

      <section className="status-section">

        <div className="section-heading">
          <div>
            <p className="eyebrow">PROJECT OVERVIEW</p>
            <h2>Production Status</h2>
          </div>

          <Link to="/films" className="text-link">
            View all →
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="status-panel">

          <div className="status-item">
            <div className="status-info">
              <span>Pre-Production</span>
              <strong>{preProduction}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    totalFilms > 0
                      ? `${(preProduction / totalFilms) * 100}%`
                      : "0%"
                }}
              ></div>
            </div>
          </div>

          <div className="status-item">
            <div className="status-info">
              <span>Shooting</span>
              <strong>{shooting}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    totalFilms > 0
                      ? `${(shooting / totalFilms) * 100}%`
                      : "0%"
                }}
              ></div>
            </div>
          </div>

          <div className="status-item">
            <div className="status-info">
              <span>Post-Production</span>
              <strong>{postProduction}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    totalFilms > 0
                      ? `${(postProduction / totalFilms) * 100}%`
                      : "0%"
                }}
              ></div>
            </div>
          </div>

          <div className="status-item">
            <div className="status-info">
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    totalFilms > 0
                      ? `${(completed / totalFilms) * 100}%`
                      : "0%"
                }}
              ></div>
            </div>
          </div>

        </div>
      </section>

      <section className="dashboard-info">

        <div className="info-card">
          <span>01</span>
          <h3>Track Projects</h3>
          <p>
            Keep all your film projects organized
            with important production details.
          </p>
        </div>

        <div className="info-card">
          <span>02</span>
          <h3>Monitor Progress</h3>
          <p>
            Quickly identify whether a film is in
            pre-production, shooting or post-production.
          </p>
        </div>

        <div className="info-card">
          <span>03</span>
          <h3>Manage Efficiently</h3>
          <p>
            Add and search film records through
            a simple and responsive interface.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;