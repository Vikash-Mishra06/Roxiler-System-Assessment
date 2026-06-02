import { useEffect, useState } from "react";
import api from "../services/api";
import "./DataPage.css";

const AdminStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await api.get(
        `/admin/stores?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(
        `/admin/stores?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-wrapper">
      
      <div className="page-header">
        <h1>Store Management</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search stores by name, email, or location..."
          value={search}
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="search-input"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="search-input"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>

        <button onClick={fetchStores} className="search-btn">
          Apply
        </button>
      </div>

      {stores.length === 0 ? (
        <div className="empty-state-card">
          <p>No matching corporate stores or retail units could be located in the registry.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Email Contact</th>
                <th>Address Location</th>
                <th>Overall Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td style={{ fontWeight: "500", color: "#0f172a" }}>{store.name}</td>
                  <td style={{ color: "#64748b" }}>{store.email}</td>
                  <td>{store.address}</td>
                  <td>
                    <span className="rating-indicator">
                      ★ {store.rating ? Number(store.rating).toFixed(1) : "0.0"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStoresPage;