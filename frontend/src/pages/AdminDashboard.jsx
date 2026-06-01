import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
    const [stats, setStats] =
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
                        "/admin/dashboard"
                    );

                setStats(
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
                Admin Dashboard
            </h1>

            <div>
                <h3>
                    Total Users
                </h3>

                <p>
                    {stats.totalUsers}
                </p>
            </div>

            <div>
                <h3>
                    Total Stores
                </h3>

                <p>
                    {stats.totalStores}
                </p>
            </div>

            <div>
                <h3>
                    Total Ratings
                </h3>

                <p>
                    {stats.totalRatings}
                </p>
            </div>
            <div>
                <Link to="/admin/users">
                    Manage Users
                </Link>
            </div>

            <div>
                <Link to="/admin/stores">
                    Manage Stores
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;