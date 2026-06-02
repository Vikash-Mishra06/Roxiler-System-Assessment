import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./StoresListing.css";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async (searchValue = "") => {
    try {
      const response = await api.get(`/stores?search=${searchValue}`);
      setStores(response.data.data);

      const initialRatings = {};
      response.data.data.forEach((store) => {
        initialRatings[store.id] = store.user_submitted_rating || "";
      });
      setRatings(initialRatings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchStores(search);
  };

  const handleRatingChange = (storeId, value) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  const handleRatingSubmit = async (store) => {
    try {
      const selectedRating = Number(ratings[store.id]);

      if (!selectedRating) {
        alert("Please select a rating");
        return;
      }

      if (store.user_submitted_rating) {
        await api.put(`/ratings/${store.id}`, {
          rating: selectedRating,
        });
        alert("Rating updated");
      } else {
        await api.post(`/ratings/${store.id}`, {
          rating: selectedRating,
        });
        alert("Rating submitted");
      }

      fetchStores(search);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <header className="stores-navbar">
        <h1>Review Terminal</h1>
        <div className="stores-actions">
          <button onClick={handleLogout} className="stores-logout-btn">
            Sign out
          </button>
          <Link to="/change-password" className="stores-change-pwd-link">
            Change Password
          </Link>
        </div>
      </header>

      <main className="stores-container">

        <div className="stores-intro">
          <h2>Stores Catalog</h2>
        </div>

        <div className="search-bar-wrap">
          <input
            type="text"
            placeholder="Search stores by name or district location..."
            value={search}
            className="stores-search-input"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="stores-search-btn">
            Search
          </button>
        </div>

        {stores.length === 0 ? (
          <div className="stores-empty-notice">
            <p>No consumer storefront units are currently listed or open for assessment logs.</p>
          </div>
        ) : (
          <div className="stores-table-shell">
            <table className="stores-grid-table">
              <thead>
                <tr>
                  <th>Store Name</th>
                  <th>Location Address</th>
                  <th>Overall Rating</th>
                  <th>Your Rating Score</th>
                  <th>Actions Log</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td style={{ fontWeight: "500", color: "#0f172a" }}>{store.name}</td>
                    <td style={{ color: "#64748b" }}>{store.address}</td>
                    <td>
                      <span className="pill-rating-score">
                        ★ {store.overall_rating ? Number(store.overall_rating).toFixed(1) : "0.0"}
                      </span>
                    </td>
                    <td>
                      <select
                        className="clean-select-box"
                        value={ratings[store.id] || ""}
                        onChange={(e) => handleRatingChange(store.id, e.target.value)}
                      >
                        <option value="">Select score</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} {rating === 5 ? "— Excellent" : rating === 1 ? "— Poor" : ""}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRatingSubmit(store)}
                        className={`action-submit-trigger ${store.user_submitted_rating ? "modify" : "create"
                          }`}
                      >
                        {store.user_submitted_rating ? "Update Rating" : "Submit Rating"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoresPage;