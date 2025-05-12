import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CashRegister {
  id: number;
  name: string;
  location: string;
  status: string;
  cashier: string;
  lastActivity: string;
}

interface EmployeeSectionProps {
  className?: string;
}

const cashRegisters: CashRegister[] = [
  {
    id: 1,
    name: "Caisse 1",
    location: "Hertz",
    status: "active",
    cashier: "Jean Dupont",
    lastActivity: "2024-03-15 14:30",
  },
  {
    id: 2,
    name: "Caisse 2",
    location: "Galileo",
    status: "inactive",
    cashier: "Non assigné",
    lastActivity: "2024-03-14 18:00",
  },
  {
    id: 3,
    name: "Caisse 3",
    location: "Pascal",
    status: "maintenance",
    cashier: "Marie Martin",
    lastActivity: "2024-03-15 10:15",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
    case "maintenance":
      return <Badge className="bg-yellow-100 text-yellow-700">Maintenance</Badge>;
    default:
      return null;
  }
}

export function EmployeeSection({
  className,
}: EmployeeSectionProps) {
  const activeRegisters = cashRegisters.filter(r => r.status !== "inactive");

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Gestion des caisses</CardTitle>
        <Link 
          to="/cashregisters" 
          className="text-sm text-[#FFB74D] hover:text-[#FFA726] flex items-center gap-1 transition-colors duration-200"
        >
          Voir plus <ChevronRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeRegisters.map((register) => (
            <div
              key={register.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{register.name}</p>
                  {getStatusBadge(register.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {register.cashier}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-[#FFB74D] hover:bg-[#FFA726] text-white font-semibold border-none"
              >
                Détails
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
