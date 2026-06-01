import { useEffect, useState } from "react";
import api from "../services/api";

const StoreOwnerDashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const response =
          await api.get(
            "/store-owner/dashboard"
          );

        setDashboard(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>
        Store Owner Dashboard
      </h1>

      <h2>
        Store Name:
        {" "}
        {
          dashboard.store
            ?.store_name
        }
      </h2>

      <h2>
        Average Rating:
        {" "}
        {
          dashboard.store
            ?.average_rating
        }
      </h2>

      <h3>
        Users Who Rated
      </h3>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.ratedUsers?.map(
            (user, index) => (
              <tr
                key={index}
              >
                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.rating}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreOwnerDashboard;