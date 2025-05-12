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

export default function CommunicationPage() {
  const [showModal, setShowModal] = useState(false);
  const actionButton = (
    <Button className="bg-primary/90 hover:bg-primary text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md" onClick={() => setShowModal(true)}>
      <Plus className="w-5 h-5" />
      Nouvelle Annonce
    </Button>
  );

  return (
    <PageLayout
      title="Communication"
      subtitle="Gestion des annonces et communications"
      actionButton={actionButton}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communications.map((comm) => (
              <TableRow key={comm.id}>
                <TableCell className="font-medium">{comm.title}</TableCell>
                <TableCell>{getTypeBadge(comm.type)}</TableCell>
                <TableCell>{getStatusBadge(comm.status)}</TableCell>
                <TableCell>{comm.date}</TableCell>
                <TableCell>{comm.reach}</TableCell>
                <TableCell className="text-right">
                  <Button className="bg-primary/90 hover:bg-primary text-white font-semibold">
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Popup création annonce */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl relative animate-fadein-smooth mx-2 sm:mx-4 p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowModal(false)}>&#10005;</button>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center gap-2"><Plus className="w-6 h-6 text-primary" />Créer une nouvelle annonce</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre de l'annonce</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Titre" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option value="promotion">Promotion</option>
                    <option value="info">Information</option>
                    <option value="news">Actualité</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Statut</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option value="active">Actif</option>
                    <option value="scheduled">Planifié</option>
                    <option value="ended">Terminé</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description courte</label>
                <textarea className="w-full border rounded px-3 py-2" placeholder="Description (optionnel)" rows={2} />
              </div>
              <button type="submit" className="w-full bg-primary/90 hover:bg-primary text-white font-semibold rounded-lg py-2 mt-2">Créer</button>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 