import React, { useState } from "react";
import { PageLayout } from "../layout/PageLayout";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

const cashRegisters = [
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
];

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
    default:
      return null;
  }
}

export default function CashRegistersPage() {
  const [showModal, setShowModal] = useState(false);
  const actionButton = (
    <Button className="bg-primary/90 hover:bg-primary text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md" onClick={() => setShowModal(true)}>
      <Plus className="w-5 h-5" />
      Nouvelle caisse
    </Button>
  );

  const activeRegisters = cashRegisters.filter(r => r.status !== "inactive");
  const inactiveRegisters = cashRegisters.filter(r => r.status === "inactive");

  return (
    <PageLayout
      title="Gestion des Caisses"
      subtitle="Suivi et configuration des caisses enregistreuses"
      actionButton={actionButton}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Caissier</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeRegisters.map((register) => (
              <TableRow key={register.id}>
                <TableCell className="font-medium">{register.name}</TableCell>
                <TableCell>{register.location}</TableCell>
                <TableCell>{getStatusBadge(register.status)}</TableCell>
                <TableCell>{register.cashier}</TableCell>
                <TableCell>{register.lastActivity}</TableCell>
                <TableCell className="text-right">
                  {register.cashier && register.cashier !== "" && register.cashier !== "Non assigné" ? (
                    register.status === "active" ? (
                      <Button className="bg-error/90 hover:bg-error text-white font-semibold">Désactiver caisse</Button>
                    ) : (
                      <Button className="bg-success hover:bg-green-600 text-white font-semibold">Activer caisse</Button>
                    )
                  ) : (
                    <Button className="bg-primary/90 hover:bg-primary text-white font-semibold">Assigner Caissier</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Tableau caisses inactives */}
      {inactiveRegisters.length > 0 && (
        <>
          <div className="pl-6 pb-2">
            <h3 className="text-lg font-semibold text-[#0F172A]">Caisses inactives</h3>
          </div>
          <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl shadow-inner overflow-hidden mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Caissier</TableHead>
                  <TableHead>Dernière activité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inactiveRegisters.map((register) => (
                  <TableRow key={register.id} className="opacity-60 grayscale">
                    <TableCell className="font-medium">{register.name}</TableCell>
                    <TableCell>{register.location}</TableCell>
                    <TableCell>{getStatusBadge(register.status)}</TableCell>
                    <TableCell>{register.cashier}</TableCell>
                    <TableCell>{register.lastActivity}</TableCell>
                    <TableCell className="text-right">
                      <Button className="bg-success hover:bg-green-600 text-white font-semibold">Activer caisse</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      {/* Popup création caisse */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl relative animate-fadein-smooth mx-2 sm:mx-4 p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowModal(false)}>&#10005;</button>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center gap-2"><Plus className="w-6 h-6 text-primary" />Créer une nouvelle caisse</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de la caisse</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Nom" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emplacement</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Emplacement" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Statut</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Caissier assigné</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Nom du caissier" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dernière activité</label>
                <input type="datetime-local" className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full bg-primary/90 hover:bg-primary text-white font-semibold rounded-lg py-2 mt-2">Créer</button>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 