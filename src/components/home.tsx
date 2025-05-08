import { Sidebar } from "./dashboard/Sidebar";
import { RestaurantCard } from "./dashboard/RestaurantCard";
import { StatisticsChart } from "./dashboard/StatisticsChart";
import { EmployeeSection } from "./dashboard/EmployeeSection";
import { ProductCarousel } from "./dashboard/ProductCarousel";
import { PointsOffers } from "./dashboard/PointsOffers";

function Home() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord MyFidelity
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Gestion de l'horaire des restaurants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <RestaurantCard
              name="Hertz"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Hertz"
              status="closed"
            />
            <RestaurantCard
              name="Galileo"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Galileo"
              status="closed"
            />
            <RestaurantCard
              name="Pascal"
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Pascal"
              status="closed"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatisticsChart />
            <ProductCarousel />
          </div>
          <div className="space-y-6">
            <EmployeeSection />
            <PointsOffers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
