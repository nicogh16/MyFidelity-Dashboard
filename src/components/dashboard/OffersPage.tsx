import React, { useState } from "react";
import { Plus, Leaf, Edit, EyeOff, RefreshCw, Globe, Droplet, TreePine } from "lucide-react";
import { PageLayout } from "../layout/PageLayout";

export const mockOffers = [
  {
    id: 1,
    name: "Gourde réutilisable",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80",
    points: 1200,
    status: "active",
    usage: 54,
    type: ["Réutilisable", "Zéro déchet"],
    eco: ["Réduit le plastique", "Longue durée"],
    description: "Dites adieu aux bouteilles jetables !",
  },
  {
    id: 2,
    name: "Snack vegan local",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=200&q=80",
    points: 800,
    status: "active",
    usage: 32,
    type: ["Vegan", "Local"],
    eco: ["Sans produit animal", "Circuit court"],
    description: "Un snack sain, 100% végétal et local.",
  },
  {
    id: 3,
    name: "Sac en coton bio",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=200&q=80",
    points: 950,
    status: "inactive",
    usage: 0,
    type: ["Réutilisable", "Bio"],
    eco: ["Remplace les sacs plastiques", "Coton certifié"],
    description: "Pour vos courses sans plastique !",
  },
  {
    id: 4,
    name: "Café équitable",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80",
    points: 600,
    status: "active",
    usage: 21,
    type: ["Bio", "Commerce équitable"],
    eco: ["Soutient les producteurs", "Agriculture durable"],
    description: "Un café bon pour la planète et les humains.",
  },
];

function EcoBadge({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full mr-1 mb-1">
      {icon} {label}
    </span>
  );
}

function OfferCard({ offer, onEdit, onDisable, onReactivate }: { offer: any, onEdit: any, onDisable: any, onReactivate?: any }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center border border-green-100 transition group ${offer.status === "inactive" ? "opacity-60 grayscale" : ""}`}>  
      <img src={offer.image} alt={offer.name} className="w-20 h-20 rounded-full object-cover border-4 border-green-100 shadow mb-2" />
      <h3 className="text-lg font-bold text-green-900 mb-1 text-center flex items-center gap-1">
        <Leaf className="w-5 h-5 text-green-500" /> {offer.name}
      </h3>
      <span className="bg-green-200 text-green-900 text-xs font-semibold px-3 py-1 rounded-full mb-2">{offer.points} pts éco</span>
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {offer.type.map((t: string) => (
          <EcoBadge key={t} label={t} icon={t === "Vegan" ? <Leaf className="w-3 h-3" /> : t === "Bio" ? <Droplet className="w-3 h-3" /> : t === "Local" ? <Globe className="w-3 h-3" /> : t === "Réutilisable" ? <RefreshCw className="w-3 h-3" /> : t === "Commerce équitable" ? <TreePine className="w-3 h-3" /> : null} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {offer.eco.map((e: string) => (
          <EcoBadge key={e} label={e} />
        ))}
      </div>
      <p className="text-xs text-green-700 italic mb-2 text-center">{offer.description}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${offer.status === "active" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"}`}>{offer.status === "active" ? "Écologique" : "Inactive"}</span>
        <span className="flex items-center gap-1 text-xs text-green-600 font-semibold"><Leaf size={14} />{offer.usage}</span>
      </div>
      <div className="flex gap-2 mt-auto w-full">
        {offer.status === "active" ? (
          <>
            <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-1 transition flex items-center justify-center gap-1" onClick={onEdit}><Edit size={16}/>Modifier</button>
            <button className="flex-1 bg-error/90 hover:bg-error text-white font-semibold rounded-lg py-1 transition flex items-center justify-center gap-1" onClick={onDisable}><EyeOff size={16}/>Désactiver</button>
          </>
        ) : (
          <button className="flex-1 bg-green-400 hover:bg-green-600 text-white font-semibold rounded-lg py-1 transition flex items-center justify-center gap-1" onClick={onReactivate}><RefreshCw size={16}/>Réactiver</button>
        )}
      </div>
    </div>
  );
}

export default function OffersPage() {
  const [showModal, setShowModal] = useState(false);
  const activeOffers = mockOffers.filter(o => o.status === "active");
  const inactiveOffers = mockOffers.filter(o => o.status !== "active");

  const actionButton = (
    <button
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
      onClick={() => setShowModal(true)}
    >
      <Plus size={20}/> Nouvelle offre éco
    </button>
  );

  return (
    <PageLayout title={<span className="flex items-center gap-2"><Leaf className="w-7 h-7 text-green-500" />Offres Écologiques</span>} actionButton={actionButton}>
      <div>
        <h2 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2"><TreePine className="w-5 h-5 text-green-400" />Offres actives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} onEdit={() => {}} onDisable={() => {}} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2"><Globe className="w-5 h-5 text-green-400" />Offres inactives ou expirées</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inactiveOffers.length === 0 && <div className="text-gray-400 italic">Aucune offre inactive</div>}
          {inactiveOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} onEdit={() => {}} onDisable={() => {}} onReactivate={() => {}} />
          ))}
        </div>
      </div>
      {/* Modale de création d'offre (structure de base) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl relative animate-fadein-smooth mx-2 sm:mx-4 p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowModal(false)}>&#10005;</button>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center gap-2"><Leaf className="w-6 h-6 text-green-500" />Créer une offre éco</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom de l'offre</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Nom écologique (ex : Snack vegan local)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image (URL)</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Lien de l'image" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description courte</label>
                <textarea className="w-full border rounded px-3 py-2" placeholder="Description mettant en avant l'impact écologique" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Valeur en points éco</label>
                <input type="number" className="w-full border rounded px-3 py-2" placeholder="Points éco" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Date de début</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Date de fin</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type de produit</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Vegan</option>
                  <option>Local</option>
                  <option>Bio</option>
                  <option>Réutilisable</option>
                  <option>Commerce équitable</option>
                  <option>Zéro déchet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Impact écologique</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Ex : Réduit le plastique, Circuit court, etc." />
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 mt-2">Créer</button>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 