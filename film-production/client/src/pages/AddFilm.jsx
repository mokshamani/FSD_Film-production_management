import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/films";

function AddFilm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    director: "",
    release_date: "",
    status: "Pre-Production"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title.trim() ||
      !formData.genre.trim() ||
      !formData.director.trim() ||
      !formData.release_date
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add film."
        );
      }

      setSuccess("Film added successfully!");

      setTimeout(() => {
        navigate("/films");
      }, 800);

    } catch (err) {
      console.error(err);
      setError(
        err.message ||
        "Unable to add film. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-film-page">

      <section className="page-header">
        <div>
          <p className="eyebrow">NEW PROJECT</p>

          <h1>Add New Film</h1>

          <p>
            Enter the details of your film production project.
          </p>
        </div>
      </section>

      <section className="form-section">

        <form
          className="film-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="title">
              Film Title <span>*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter film title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="genre">
                Genre <span>*</span>
              </label>

              <input
                id="genre"
                name="genre"
                type="text"
                placeholder="e.g. Drama, Thriller"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="director">
                Director <span>*</span>
              </label>

              <input
                id="director"
                name="director"
                type="text"
                placeholder="Enter director name"
                value={formData.director}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="release_date">
                Release Date <span>*</span>
              </label>

              <input
                id="release_date"
                name="release_date"
                type="date"
                value={formData.release_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">
                Production Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pre-Production">
                  Pre-Production
                </option>

                <option value="Shooting">
                  Shooting
                </option>

                <option value="Post-Production">
                  Post-Production
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {success && (
            <div className="form-success">
              {success}
            </div>
          )}

          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/films")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting
                ? "Adding Film..."
                : "Add Film"}
            </button>

          </div>

        </form>

      </section>

    </div>
  );
}

export default AddFilm;