import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface StatisticsChartProps {
  className?: string;
}

const testData = {
  connexions: {
    daily: [1200, 1450, 1800, 2100, 1650, 2300, 1950],
    average: 1780,
    weeklyChange: 15.2,
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  },
  carbone: {
    daily: [12, 18, 25, 30, 22, 35, 28], // en % de réduction
    average: 24.3,
    weeklyChange: 8.7,
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  },
};

const chartOptions = [
  { key: "connexions", label: "Connexions" },
  { key: "carbone", label: "Carbone" },
];

export function StatisticsChart({ className }: StatisticsChartProps) {
  const [chartType, setChartType] = useState<'connexions' | 'carbone'>('connexions');
  const [heights, setHeights] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chartData = testData[chartType];
  const chartHeight = 280; // px
  const maxValue = Math.max(...chartData.daily);
  const normalizedHeights = chartData.daily.map(value => (value / maxValue) * chartHeight);

  useEffect(() => {
    setHeights(Array(7).fill(0));
    const timer = setTimeout(() => {
      setHeights(normalizedHeights);
    }, 100);
    return () => clearTimeout(timer);
  }, [chartType]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium">
            {chartType === 'connexions' ? 'Connexions journalières' : "Réduction d'empreinte carbone"}
          </CardTitle>
        </div>
        <div className="relative">
          <button
            className="px-3 py-1 bg-gray-100 rounded-md border text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {chartOptions.find(opt => opt.key === chartType)?.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow z-30">
              {chartOptions.map(opt => (
                <button
                  key={opt.key}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                    chartType === opt.key ? "font-bold bg-gray-50" : ""
                  )}
                  onClick={() => {
                    setChartType(opt.key as 'connexions' | 'carbone');
                    setDropdownOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full bg-white rounded-lg p-4 relative overflow-visible">
          <div className="absolute left-0 right-0 bottom-12 flex items-end justify-between h-[280px] z-10">
            {heights.map((height, index) => (
              <div key={index} className="flex flex-col items-center w-[12%]">
                <div
                  className={
                    cn(
                      "relative transition-all duration-500 ease-out cursor-pointer",
                      "bg-[#0F172A]",
                      "rounded-t-md",
                      hovered === index ? "shadow-lg scale-105" : ""
                    )
                  }
                  style={{ height: `${height}px`, minHeight: 20, width: '100%' }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === index && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#0F172A] text-xs px-2 py-1 rounded shadow border z-20 whitespace-nowrap">
                      {chartType === 'connexions'
                        ? `${chartData.daily[index].toLocaleString()} connexions`
                        : `-${chartData.daily[index]}% carbone`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute left-0 right-0 bottom-4 flex items-end justify-between h-8 z-20">
            {chartData.days.map((day, index) => (
              <div key={day} className="w-[12%] text-xs text-muted-foreground text-center">
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Moyenne</p>
            <p className="text-2xl font-bold">
              {chartType === 'connexions'
                ? chartData.average.toLocaleString()
                : `-${chartData.average}%`}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cette semaine</p>
            <p className="text-2xl font-bold text-green-500">
              {chartType === 'connexions'
                ? `+${chartData.weeklyChange}%`
                : `-${chartData.weeklyChange}%`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
