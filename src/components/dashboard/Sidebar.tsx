import { cn } from "@/lib/utils";
import {
  Home,
  BarChart2,
  MessageSquare,
  Users,
  Store,
  Award,
  LogOut,
  Coins,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  const location = useLocation();
  const isCurrent = location.pathname === href;

  return isCurrent ? (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg bg-[#FFB347] text-white font-semibold cursor-default shadow-md border border-[#FFB347]/30",
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </div>
  ) : (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-nightblue font-semibold hover:bg-[#FFB347]/80 hover:text-white",
        active
          ? "bg-[#FFB347] text-white font-semibold"
          : ""
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r p-4 w-64 fixed left-0 top-0 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">My</span>
          <span className="text-nightblue">Fidelity</span>
        </h1>
      </div>

      <div className="space-y-1 mt-8">
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          href="/dashboard"
        />
        <SidebarItem
          icon={<BarChart2 size={20} />}
          label="Statistiques"
          href="/statistics"
        />
        <SidebarItem
          icon={<MessageSquare size={20} />}
          label="Communication"
          href="/communication"
        />
        <SidebarItem
          icon={<Coins size={20} />}
          label="Caisses"
          href="/cashregisters"
        />
        <SidebarItem
          icon={<Store size={20} />}
          label="Restaurants"
          href="/restaurants"
        />
        <SidebarItem
          icon={<Award size={20} />}
          label="Offres"
          href="/offers"
        />
      </div>

      <div className="mt-auto">
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Déconnexion"
          href="/logout"
        />
      </div>
    </div>
  );
}
