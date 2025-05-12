import React from "react";
import { PageLayout } from "../layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { StatisticsChart } from "../dashboard/StatisticsChart";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../ui/tooltip";

const stats = [
  { title: "Clients aujourd'hui", value: "1,234", change: "+12%" },
  { title: "Points distribués", value: "5,678", change: "+8%" },
  { title: "Restaurants actifs", value: "12", change: "+2" },
  { title: "Taux de satisfaction", value: "92%", change: "+5%" },
];

export default function StatisticsPage() {
  return (
    <PageLayout
      title="Statistiques"
      subtitle="Vue d'ensemble des performances"
    >
      <div className="grid gap-6">
        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Jauge de satisfaction */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Satisfaction client</CardTitle>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      <Info className="w-4 h-4 text-[#A0AEC0]" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs text-sm">
                    La satisfaction client est calculée à partir des retours des enquêtes de satisfaction, du taux de réclamation, et de la note moyenne attribuée par les clients sur les 30 derniers jours.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score global</span>
                <span className="text-2xl font-bold">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Nouveau graphique premium */}
        <StatisticsChart />
      </div>
    </PageLayout>
  );
} 