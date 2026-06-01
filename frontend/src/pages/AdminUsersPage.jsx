import { useEffect, useState } from "react";
import api from "../services/api";

const AdminUsersPage = () => {
  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response =
        await api.get(
          "/admin/users"
        );

      setUsers(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch =
    async () => {
      try {
        const response =
          await api.get(
            `/admin/users?search=${search}`
          );

        setUsers(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h1>User Management</h1>

      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleSearch
        }
      >
        Search
      </button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user) => (
              <tr
                key={user.id}
              >
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.address}
                </td>
                <td>
                  {user.role}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;