import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/community/home";
import LoginPage from "./pages/auth/login";
import PoliceDashboard from "./pages/police/dashboard";
import SectorDashboard from "./pages/privateSectors/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/police/dashboard" element={<PoliceDashboard />} />
        <Route path="/sector/dashboard" element={<SectorDashboard />} />
      </Routes>
    </>
  );
}

export default App;
