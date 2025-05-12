import { useEffect, useState } from "react";
import ChatBotBubble from "./ChatBotBubble";
import SplashScreen from "./SplashScreen";
import { Sidebar } from "./dashboard/Sidebar";
import { RestaurantCard } from "./dashboard/RestaurantCard";
import { StatisticsChart } from "./dashboard/StatisticsChart";
import { EmployeeSection } from "./dashboard/EmployeeSection";
import { ProductCarousel } from "./dashboard/ProductCarousel";
import { PointsOffers } from "./dashboard/PointsOffers";
import { RestaurantScheduleModal, SpecialHour } from "./dashboard/RestaurantScheduleModal";
import { supabase } from "../lib/supabaseClient";
import { toast } from "./ui/use-toast";
import { useRestaurants } from "./context/RestaurantsProvider";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { defaultRestaurantImages as defaultImages } from "../lib/constants";
import { Badge } from "./ui/badge";
import { mockOffers } from "./dashboard/OffersPage";

const defaultSchedule = [
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "10:00", close: "16:00" },
  { open: "10:00", close: "16:00" },
];

const initialRestaurants = [
  {
    name: "Hertz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hertz",
    status: "closed",
    schedule: [...defaultSchedule],
    specialHours: [] as SpecialHour[],
  },
  {
    name: "Galileo",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Galileo",
    status: "closed",
    schedule: [...defaultSchedule],
    specialHours: [] as SpecialHour[],
  },
  {
    name: "Pascal",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pascal",
    status: "closed",
    schedule: [...defaultSchedule],
    specialHours: [] as SpecialHour[],
  },
];

// Images par défaut pour les restaurants
const defaultRestaurantImages = {
  "Hertz": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
  "Galileo": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  "Pascal": "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
  "default": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&q=80"
};

// Fonction pour obtenir l'image du restaurant
function getRestaurantImage(name: string, imageUrl: string | null): string {
  if (imageUrl) return imageUrl;
  return defaultImages[name] || defaultImages.default;
}

function isOpenNow(schedule, specialHours) {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche
  const todayIdx = day === 0 ? 6 : day - 1;
  const nowStr = now.toTimeString().slice(0,5);

  // Sécurité : valeur par défaut si schedule absent ou trop court
  const safeSchedule = Array.isArray(schedule) && schedule.length === 7 ? schedule : defaultSchedule;

  // Vérifie si un horaire spécial existe pour aujourd'hui
  const todaySpecial = (specialHours || []).find(s => s.date === now.toISOString().slice(0,10));
  if (todaySpecial) {
    return todaySpecial.open <= nowStr && nowStr < todaySpecial.close;
  }
  const { open, close } = safeSchedule[todayIdx] || { open: '', close: '' };
  return open <= nowStr && nowStr < close;
}

// Données mockées synchronisées avec CommunicationPage
const communications = [
  {
    id: 1,
    title: "Offre spéciale -20%",
    type: "promotion",
    status: "active",
    date: "2024-03-15",
    reach: "1,234",
  },
  {
    id: 2,
    title: "Fermeture exceptionnelle",
    type: "info",
    status: "scheduled",
    date: "2024-03-20",
    reach: "0",
  },
  {
    id: 3,
    title: "Nouveau menu disponible",
    type: "news",
    status: "active",
    date: "2024-03-10",
    reach: "2,567",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors">Actif</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">Planifié</Badge>;
    case "ended":
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">Terminé</Badge>;
    default:
      return null;
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "promotion":
      return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">Promotion</Badge>;
    case "info":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">Information</Badge>;
    case "news":
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors">Actualité</Badge>;
    default:
      return null;
  }
}

function Home() {
  const { restaurants, loading, error, refresh } = useRestaurants();
  const [editingIdx, setEditingIdx] = useState<number|null>(null);

  // Effet parallax sur les polygones du SVG
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const parallaxConfigs = [
        { id: 'poly1', factor: 0.2 },
        { id: 'poly2', factor: 0.15 },
        { id: 'poly3', factor: 0.1 },
        { id: 'poly4', factor: 0.25 },
        { id: 'poly5', factor: 0.18 },
        { id: 'poly6', factor: 0.12 },
        { id: 'poly7', factor: 0.22 },
        { id: 'poly8', factor: 0.16 },
      ];
      parallaxConfigs.forEach(({ id, factor }) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.transform = `translateY(${scrollY * factor}px)`;
        }
      });
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEdit = (idx: number) => setEditingIdx(idx);
  const handleCloseModal = () => setEditingIdx(null);

  // SAUVEGARDE optimisée dans Supabase
  const handleSave = async (schedule, specialHours) => {
    const r = restaurants[editingIdx];
    if (!r || !r.id) {
      // Affichage d'une erreur locale si besoin
      return;
    }
    await supabase.from('restaurants').update({
      schedule: schedule,
      special_hours: specialHours,
    }).eq('id', r.id);
    await refresh();
    setEditingIdx(null);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen relative overflow-hidden">
      {/* SVG décoratif de fond avec IDs pour parallax */}
      <svg
        className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon id="poly1" points="0,1080 400,600 800,1080" fill="#e5e7eb" opacity="0.5" />
        <polygon id="poly2" points="1120,1080 1520,600 1920,1080" fill="#e5e7eb" opacity="0.4" />
        <polygon id="poly3" points="480,1080 960,300 1440,1080" fill="#6b7280" opacity="0.07" />
        <polygon id="poly4" points="0,0 200,200 0,400" fill="#6b7280" opacity="0.10" />
        <polygon id="poly5" points="1920,0 1720,200 1920,400" fill="#6b7280" opacity="0.10" />
        <polygon id="poly6" points="960,0 1040,120 880,120" fill="#e5e7eb" opacity="0.18" />
        <polygon id="poly7" points="200,200 400,350 300,500" fill="#fff" opacity="0.13" />
        <polygon id="poly8" points="1720,200 1520,350 1620,500" fill="#fff" opacity="0.13" />
      </svg>
      <Sidebar />
      <div className="flex-1 ml-64 p-6 relative z-10">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Chargement des données...</div>
        ) : error ? (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        ) : (
          <div className="animate-fadein-smooth">
            <header className="mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Bienvenue sur votre tableau de bord MyFidelity
              </p>
            </header>
            <section className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold">
                  Gestion de l'horaire des restaurants
                </h2>
                <Link 
                  to="/restaurants" 
                  className="text-sm text-[#FFB74D] hover:text-[#FFA726] flex items-center gap-1 transition-colors duration-200"
                >
                  Voir plus <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {restaurants.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400 py-8">Aucun restaurant trouvé dans la base Supabase.</div>
                ) : (
                  restaurants.map((r, idx) => (
                    <RestaurantCard
                      key={r.name}
                      name={r.name}
                      image={getRestaurantImage(r.name, r.image)}
                      status={isOpenNow(r.schedule, r.special_hours) ? "open" : "closed"}
                      specialHours={Array.isArray(r.special_hours) && r.special_hours.length > 0}
                      onEdit={() => handleEdit(idx)}
                    />
                  ))
                )}
              </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StatisticsChart />
                <ProductCarousel />
              </div>
              <div className="space-y-6">
                <EmployeeSection />
                {/* Carte Communication */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3 border border-pearl/60 animate-fadein-smooth">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-nightblue">Communication</h3>
                    <Link to="/communication" className="text-sm text-[#FFB74D] hover:text-[#FFA726] flex items-center gap-1 transition-colors duration-200">Voir plus <ChevronRight className="w-4 h-4" /></Link>
                  </div>
                  {communications.filter(c => c.status === "active" || c.status === "scheduled").length === 0 ? (
                    <div className="text-gray-400 text-center py-4">Aucune annonce en cours</div>
                  ) : (
                    <ul className="divide-y divide-pearl/60">
                      {communications.filter(c => c.status === "active" || c.status === "scheduled").slice(0,3).map(comm => (
                        <li key={comm.id} className="py-2 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-nightblue">{comm.title}</span>
                            {getTypeBadge(comm.type)}
                            {getStatusBadge(comm.status)}
                          </div>
                          <div className="text-xs flex gap-2">
                            <span className="text-gray-500 font-medium">{comm.date}</span>
                            <span className="text-gold">{comm.reach} vues</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <PointsOffers offers={mockOffers} />
              </div>
            </div>
          </div>
        )}
        {editingIdx !== null && restaurants[editingIdx] && (
          <RestaurantScheduleModal
            name={restaurants[editingIdx].name}
            schedule={Array.isArray(restaurants[editingIdx].schedule) ? JSON.parse(JSON.stringify(restaurants[editingIdx].schedule)) : []}
            specialHours={Array.isArray(restaurants[editingIdx].special_hours) ? JSON.parse(JSON.stringify(restaurants[editingIdx].special_hours)) : []}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
      <ChatBotBubble />
    </div>
  );
}

export default Home;

// Animations CSS à ajouter dans index.css ou tailwind.config.js :
// .animate-fadein { animation: fadein 0.7s; }
// .animate-fadein-smooth { animation: fadein-smooth 1.2s cubic-bezier(.4,0,.2,1); }
// @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
// @keyframes fadein-smooth { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
