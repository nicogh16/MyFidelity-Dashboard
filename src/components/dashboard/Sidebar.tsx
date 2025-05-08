import { cn } from "@/lib/utils";
import {
  Home,
  BarChart2,
  MessageSquare,
  Users,
  Store,
  Award,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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
        "flex flex-col h-screen bg-white border-r p-4 w-64 fixed left-0 top-0",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">MF</span>
        </div>
        <h1 className="text-xl font-bold">MyFidelity</h1>
      </div>

      <div className="space-y-1 mt-8">
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          href="/"
          active
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
          icon={<Users size={20} />}
          label="Employés"
          href="/employees"
        />
        <SidebarItem
          icon={<Store size={20} />}
          label="Restaurants"
          href="/restaurants"
        />
        <SidebarItem icon={<Award size={20} />} label="Points" href="/points" />
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
