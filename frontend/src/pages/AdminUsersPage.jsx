import { useEffect, useState } from "react";
import api from "../services/api";
import "./DataPage.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `/admin/users?search=${search}&sortBy=${sortBy}&order=${order}`
      );

      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(
        `/admin/users?search=${search}&sortBy=${sortBy}&order=${order}`
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleClass = (role) => {
    if (!role) return "user";
    return role.toLowerCase().replace("-", "_");
  };

  return (
    <div className="page-wrapper">

      <div className="page-header">
        <h1>User Management</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name or email..."
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

        <button onClick={fetchUsers} className="search-btn">
          Apply
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state-card">
          <p>No matching user logs could be located in the directory system.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user.email}>
                  <td style={{ fontWeight: "500" }}>{user.name}</td>
                  <td style={{ color: "#475569" }}>{user.email}</td>
                  <td>{user.address || "—"}</td>
                  <td>
                    <span className={`role-badge ${getRoleClass(user.role)}`}>
                      {user.role ? user.role.replace("_", " ") : "USER"}
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

export default AdminUsersPage;