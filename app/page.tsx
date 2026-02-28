"use client"
import { useState } from "react"

const baseRates: Record<string, Record<string, number>> = {
  branding:       { Junior: 250, Mid: 450, Senior: 700,  Expert: 1000 },
  ux:             { Junior: 300, Mid: 500, Senior: 750,  Expert: 1100 },
  motion:         { Junior: 350, Mid: 550, Senior: 800,  Expert: 1200 },
  copywriting:    { Junior: 200, Mid: 350, Senior: 550,  Expert: 800  },
  webdesign:      { Junior: 280, Mid: 480, Senior: 720,  Expert: 1050 },
  illustration:   { Junior: 220, Mid: 400, Senior: 620,  Expert: 900  },
  // 📷 Photo
  photo_portrait: { Junior: 200, Mid: 350, Senior: 550,  Expert: 800  },
  photo_corporate:{ Junior: 250, Mid: 420, Senior: 650,  Expert: 950  },
  photo_produit:  { Junior: 280, Mid: 450, Senior: 680,  Expert: 1000 },
  photo_event:    { Junior: 200, Mid: 280, Senior: 420, Expert: 600  },
  photo_mode:     { Junior: 350, Mid: 600, Senior: 900,  Expert: 1400 },
  // 🎬 Vidéo
  video_social:   { Junior: 300, Mid: 500, Senior: 750,  Expert: 1100 },
  video_corporate:{ Junior: 400, Mid: 650, Senior: 950,  Expert: 1400 },
  video_clip:     { Junior: 450, Mid: 750, Senior: 1100, Expert: 1600 },
  video_doc:      { Junior: 400, Mid: 700, Senior: 1050, Expert: 1500 },
  video_pub:      { Junior: 500, Mid: 850, Senior: 1300, Expert: 2000 },
}

const complexityMultiplier: Record<string, number> = {
  Simple: 0.8,
  Moyen: 1.0,
  Complexe: 1.35,
}

export default function Home() {
  const [type, setType] = useState("")
  const [seniority, setSeniority] = useState("")
  const [complexity, setComplexity] = useState("")
  const [days, setDays] = useState("")
  const [result, setResult] = useState<null | { daily: number; total: number; min: number; max: number }>(null)

  function calculate() {
    const base = baseRates[type][seniority]
    const multiplier = complexityMultiplier[complexity]
    const daily = Math.round(base * multiplier)
    const total = daily * Number(days)
    setResult({
      daily,
      total,
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.15),
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Pricing Freelance</h1>
        <p className="text-gray-500 mb-8">Trouve le bon tarif pour ta mission</p>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type de mission</label>
            <select
  className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option value="">Choisir...</option>
  <optgroup label="📷 Photographie">
    <option value="photo_portrait">Portrait / Lifestyle</option>
    <option value="photo_corporate">Photo Corporate / Institutionnel</option>
    <option value="photo_produit">Photo Produit / E-commerce</option>
    <option value="photo_event">Événementiel</option>
    <option value="photo_mode">Mode / Beauté</option>
  </optgroup>
  <optgroup label="🎬 Vidéo">
    <option value="video_social">Contenu Réseaux Sociaux</option>
    <option value="video_corporate">Film Corporate / Institutionnel</option>
    <option value="video_clip">Clip Musical</option>
    <option value="video_doc">Documentaire</option>
    <option value="video_pub">Publicité / Spot TV</option>
  </optgroup>
  <optgroup label="🎨 Design & Création">
    <option value="branding">Branding / Identité visuelle</option>
    <option value="ux">UX / UI Design</option>
    <option value="motion">Motion Design</option>
    <option value="copywriting">Copywriting</option>
    <option value="webdesign">Web Design</option>
    <option value="illustration">Illustration</option>
  </optgroup>
</select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ton niveau</label>
            <div className="grid grid-cols-4 gap-2">
              {["Junior", "Mid", "Senior", "Expert"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeniority(level)}
                  className={`p-2 rounded-xl border text-sm font-medium transition-all ${
                    seniority === level ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Complexité</label>
            <div className="grid grid-cols-3 gap-2">
              {["Simple", "Moyen", "Complexe"].map((level) => (
                <button
                  key={level}
                  onClick={() => setComplexity(level)}
                  className={`p-2 rounded-xl border text-sm font-medium transition-all ${
                    complexity === level ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-black"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Durée estimée (jours)</label>
            <input
              type="number"
              min="1"
              placeholder="ex: 5"
              className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-30"
            disabled={!type || !seniority || !complexity || !days}
          >
            Calculer mon tarif →
          </button>

          {/* Résultat */}
          {result && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Résultat</p>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tarif journalier</span>
                <span className="text-2xl font-bold text-gray-900">{result.daily} €/j</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total mission</span>
                <span className="text-2xl font-bold text-black">{result.total} €</span>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1">Fourchette marché</p>
                <p className="text-lg font-semibold text-gray-700">
                  {result.min} € — {result.max} €
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Basé sur les données du marché freelance français 🇫🇷
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}