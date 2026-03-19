import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAppContext } from "./AppContext/AppContext";
import Layout from "./components/Layout";
import Template from "./pages/Template";
import Resume from "./pages/Resume";

export default function App() {
  const { isLogin } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/dashboard" element={isLogin ? <Layout /> : <Navigate to="/login" />} >
        <Route index element={<Dashboard />} /> 
        <Route path="template" element={<Template />} /> 
        <Route path="resume/:userId" element={<Resume />} />
      </Route>

      <Route 
        path="/login" 
        element={!isLogin ? <Login /> : <Navigate to="/dashboard" />} 
      />
    </Routes>
  );
}