import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAppContext } from "./AppContext/AppContext";

export default function App() {
  const { isLogin } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/dashboard" 
        element={isLogin ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/login" 
        element={!isLogin ? <Login /> : <Navigate to="/dashboard" />} 
      />
    </Routes>
  );
}