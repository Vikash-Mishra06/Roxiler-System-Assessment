import { useEffect, useState } from "react";
import api from "../services/api";

const AdminStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await api.get(
        "/admin/stores"
      );

      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(
        `/admin/stores?search=${search}`
      );

      setStores(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Store Management</h1>

      <input
        type="text"
        placeholder="Search stores"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStoresPage;