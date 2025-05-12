import React, { useState } from "react";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Valeur par défaut de schedule si absent ou mal formé
const defaultSchedule = [
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "08:00", close: "18:00" },
  { open: "10:00", close: "16:00" },
  { open: "10:00", close: "16:00" },
];

export interface SpecialHour {
  date: string;
  open: string;
  close: string;
}

interface RestaurantScheduleModalProps {
  name: string;
  schedule: { open: string; close: string }[];
  specialHours: SpecialHour[];
  onClose: () => void;
  onSave: (schedule: { open: string; close: string }[], specialHours: SpecialHour[]) => void;
}

export function RestaurantScheduleModal({ name, schedule: initialSchedule, specialHours: initialSpecial, onClose, onSave }: RestaurantScheduleModalProps) {
  // Sécurisation de l'initialisation du schedule
  const safeInitialSchedule = Array.isArray(initialSchedule) && initialSchedule.length === 7
    ? initialSchedule
    : defaultSchedule;
  const [schedule, setSchedule] = useState(safeInitialSchedule);
  const [specialHours, setSpecialHours] = useState<SpecialHour[]>(Array.isArray(initialSpecial) ? initialSpecial : []);

  const handleScheduleChange = (idx: number, field: "open" | "close", value: string) => {
    setSchedule(sch => sch.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const handleSpecialChange = (idx: number, field: "date" | "open" | "close", value: string) => {
    setSpecialHours(sh => sh.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const addSpecial = () => setSpecialHours(sh => [...sh, { date: "", open: "", close: "" }]);
  const removeSpecial = (idx: number) => setSpecialHours(sh => sh.filter((_, i) => i !== idx));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative animate-fadein-smooth">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={onClose}>&#10005;</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier les horaires de <span className="text-blue-600">{name}</span></h2>
        <div className="space-y-3 mb-6">
          {days.map((day, idx) => {
            const s = schedule[idx] || { open: "", close: "" };
            return (
              <div key={day} className="flex items-center gap-2">
                <span className="w-24 text-sm">{day}</span>
                <input type="time" value={s.open} onChange={e => handleScheduleChange(idx, "open", e.target.value)} className="border rounded px-2 py-1 text-sm" />
                <span className="text-xs">à</span>
                <input type="time" value={s.close} onChange={e => handleScheduleChange(idx, "close", e.target.value)} className="border rounded px-2 py-1 text-sm" />
              </div>
            );
          })}
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">Horaires spéciaux</span>
            <button className="text-blue-600 text-sm hover:underline" onClick={addSpecial}>+ Ajouter</button>
          </div>
          {specialHours.map((sh, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input type="date" value={sh.date} onChange={e => handleSpecialChange(idx, "date", e.target.value)} className="border rounded px-2 py-1 text-sm" />
              <input type="time" value={sh.open} onChange={e => handleSpecialChange(idx, "open", e.target.value)} className="border rounded px-2 py-1 text-sm" />
              <span className="text-xs">à</span>
              <input type="time" value={sh.close} onChange={e => handleSpecialChange(idx, "close", e.target.value)} className="border rounded px-2 py-1 text-sm" />
              <button className="text-red-500 text-lg" onClick={() => removeSpecial(idx)} title="Supprimer">&#10005;</button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded bg-[#FFD580] hover:bg-[#FFB347] text-nightblue font-semibold" onClick={onClose}>Annuler</button>
          <button className="px-4 py-2 rounded bg-[#FFB74D] hover:bg-[#FFA726] text-white font-semibold" onClick={() => onSave(schedule, specialHours)}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
} 