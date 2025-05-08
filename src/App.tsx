import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/statistics"
            element={
              <div className="p-6 ml-64">
                <h1 className="text-2xl font-bold">Statistiques</h1>
              </div>
            }
          />
          <Route
            path="/communication"
            element={
              <div className="p-6 ml-64">
                <h1 className="text-2xl font-bold">Communication</h1>
              </div>
            }
          />
          <Route
            path="/employees"
            element={
              <div className="p-6 ml-64">
                <h1 className="text-2xl font-bold">Employés</h1>
              </div>
            }
          />
          <Route
            path="/restaurants"
            element={
              <div className="p-6 ml-64">
                <h1 className="text-2xl font-bold">Restaurants</h1>
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
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
