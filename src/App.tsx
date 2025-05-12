import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import StatisticsPage from "./components/statistics/StatisticsPage";
import SplashRedirect from "./components/SplashRedirect";
import CommunicationPage from "./components/communication/CommunicationPage";
import CashRegistersPage from "./components/cashregisters/CashRegistersPage";
import RestaurantsPage from "./components/restaurants/RestaurantsPage";
import OffersPage from "./components/dashboard/OffersPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/communication" element={<CommunicationPage />} />
        <Route path="/cashregisters" element={<CashRegistersPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route
          path="/employees"
          element={
            <div className="p-6 ml-64">
              <h1 className="text-2xl font-bold">Employés</h1>
            </div>
          }
        />
        <Route
          path="/points"
          element={
            <div className="p-6 ml-64">
              <h1 className="text-2xl font-bold">Points</h1>
            </div>
          }
        />
        <Route
          path="/logout"
          element={
            <div className="p-6">
              <h1 className="text-2xl font-bold">Déconnexion...</h1>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
