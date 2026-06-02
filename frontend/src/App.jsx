import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AdminDashboard from "./pages/AdminDashboard";
import StoresPage from "./pages/StoresPage";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminUsersPage from "./pages/AdminUsersPage";

import AdminStoresPage from "./pages/AdminStoresPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute>
            <StoresPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/store-owner"
        element={
          <ProtectedRoute>
            <StoreOwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute>
            <AdminStoresPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;