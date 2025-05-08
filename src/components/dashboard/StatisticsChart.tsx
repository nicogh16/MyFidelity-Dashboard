import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsChartProps {
  className?: string;
}

export function StatisticsChart({ className }: StatisticsChartProps) {
  // This is a placeholder for a real chart library
  // In a real application, you would use a library like recharts, chart.js, etc.
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Connexions journalières
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {/* Placeholder for chart */}
          <div className="relative h-full w-full">
            <div className="absolute inset-0 flex items-end">
              <div className="w-1/7 h-[30%] bg-primary/20 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[45%] bg-primary/20 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[60%] bg-primary/20 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[80%] bg-primary/40 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[65%] bg-primary/40 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[90%] bg-primary/60 rounded-t-md mx-0.5"></div>
              <div className="w-1/7 h-[75%] bg-primary rounded-t-md mx-0.5"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground pt-2 border-t">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mer</div>
              <div>Jeu</div>
              <div>Ven</div>
              <div>Sam</div>
              <div>Dim</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Moyenne</p>
            <p className="text-2xl font-bold">1,245</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
            <p className="text-2xl font-bold">+12.5%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
