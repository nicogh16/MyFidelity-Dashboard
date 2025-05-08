import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface EmployeeSectionProps {
  employees?: Array<{ id: string; name: string; role: string }>;
  className?: string;
}

export function EmployeeSection({
  employees = [],
  className,
}: EmployeeSectionProps) {
  const hasEmployees = employees.length > 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Gestion Employés</CardTitle>
      </CardHeader>
      <CardContent>
        {hasEmployees ? (
          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {employee.role}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-secondary p-3 mb-4">
              <UserPlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Pas encore de caissier assigné
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ajoutez des employés pour gérer votre restaurant
            </p>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un caissier
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
