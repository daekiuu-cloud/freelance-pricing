"use client"
import { useState, useMemo } from "react"
import Link from "next/link"

const baseRates: Record<string, Record<string, number>> = {
  branding:        { Junior: 250, Mid: 450, Senior: 700,  Expert: 1000 },
  ux:              { Junior: 300, Mid: 500, Senior: 750,  Expert: 1100 },
  motion:          { Junior: 350, Mid: 550, Senior: 800,  Expert: 1200 },
  copywriting:     { Junior: 200, Mid: 350, Senior: 550,  Expert: 800  },
  webdesign:       { Junior: 280, Mid: 480, Senior: 720,  Expert: 1050 },
  illustration:    { Junior: 220, Mid: 400, Senior: 620,  Expert: 900  },
  photo_portrait:  { Junior: 200, Mid: 350, Senior: 550,  Expert: 800  },
  photo_corporate: { Junior: 250, Mid: 420, Senior: 650,  Expert: 950  },
  photo_produit:   { Junior: 280, Mid: 450, Senior: 680,  Expert: 1000 },
  photo_event:     { Junior: 200, Mid: 280, Senior: 420,  Expert: 600  },
  photo_mode:      { Junior: 350, Mid: 600, Senior: 900,  Expert: 1400 },
  video_social:    { Junior: 300, Mid: 500, Senior: 750,  Expert: 1100 },
  video_corporate: { Junior: 400, Mid: 650, Senior: 950,  Expert: 1400 },
  video_clip:      { Junior: 450, Mid: 750, Senior: 1100, Expert: 1600 },
  video_doc:       { Junior: 400, Mid: 700, Senior: 1050, Expert: 1500 },
  video_pub:       { Junior: 500, Mid: 850, Senior: 1300, Expert: 2000 },
}

const seniorityLevels = ["Junior", "Mid", "Senior", "Expert"]
const complexityLevels = ["Simple", "Moyen", "Complexe"]
const complexityMultiplier = [0.8, 1.0, 1.35]

const missionGroups = [
  {
    label: "Photographie",
    options: [
      { value: "photo_portrait",  label: "Portrait / Lifestyle" },
      { value: "photo_corporate", label: "Corporate / Institutionnel" },
      { value: "photo_produit",   label: "Produit / E-commerce" },
      { value: "photo_event",     label: "Événementiel" },
      { value: "photo_mode",      label: "Mode / Beauté" },
    ],
  },
  {
    label: "Vidéo",
    options: [
      { value: "video_social",    label: "Réseaux Sociaux" },
      { value: "video_corporate", label: "Corporate / Institutionnel" },
      { value: "video_clip",      label: "Clip Musical" },
      { value: "video_doc",       label: "Documentaire" },
      { value: "video_pub",       label: "Publicité / Spot TV" },
    ],
  },
  {
    label: "Design & Création",
    options: [
      { value: "branding",      label: "Branding / Identité visuelle" },
      { value: "ux",            label: "UX / UI Design" },
      { value: "motion",        label: "Motion Design" },
      { value: "copywriting",   label: "Copywriting" },
      { value: "webdesign",     label: "Web Design" },
      { value: "illustration",  label: "Illustration" },
    ],
  },
]

function formatEur(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
}

export default function Home() {
  const [type, setType]           = useState("")
  const [seniorityIdx, setSeniority] = useState(1)
  const [complexityIdx, setComplexity] = useState(1)
  const [days, setDays]           = useState(5)

  const result = useMemo(() => {
    if (!type) return null
    const base = baseRates[type][seniorityLevels[seniorityIdx]]
    const multiplier = complexityMultiplier[complexityIdx]
    const daily = Math.round(base * multiplier)
    const total = daily * days
    return { daily, total, min: Math.round(total * 0.85), max: Math.round(total * 1.15) }
  }, [type, seniorityIdx, complexityIdx, days])

  return (
    <main className="min-h-screen bg-[#f8f8f6] flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block text-xs text-neutral-400 hover:text-neutral-700 transition-colors mb-6">
            ← Accueil
          </Link>
          <p className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase mb-3">Freelance Pricing</p>
          <h1 className="text-4xl font-semibold text-neutral-900 leading-tight">
            Trouve ton<br />juste tarif.
          </h1>
        </div>

        <div className="space-y-10">

          {/* Type de mission */}
          <div>
            <label className="block text-xs font-medium tracking-[0.15em] text-neutral-400 uppercase mb-3">
              Type de mission
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-2xl px-4 py-3.5 text-sm text-neutral-800 focus:outline-none focus:border-neutral-400 transition-colors"
            >
              <option value="">Sélectionner...</option>
              {missionGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Seniority */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-xs font-medium tracking-[0.15em] text-neutral-400 uppercase">
                Niveau
              </label>
              <span className="text-sm font-semibold text-neutral-900">{seniorityLevels[seniorityIdx]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={seniorityIdx}
              onChange={(e) => setSeniority(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2">
              {seniorityLevels.map((l, i) => (
                <span
                  key={l}
                  className={`text-xs transition-colors ${i === seniorityIdx ? "text-neutral-900 font-medium" : "text-neutral-300"}`}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-xs font-medium tracking-[0.15em] text-neutral-400 uppercase">
                Complexité
              </label>
              <span className="text-sm font-semibold text-neutral-900">{complexityLevels[complexityIdx]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={complexityIdx}
              onChange={(e) => setComplexity(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2">
              {complexityLevels.map((l, i) => (
                <span
                  key={l}
                  className={`text-xs transition-colors ${i === complexityIdx ? "text-neutral-900 font-medium" : "text-neutral-300"}`}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Jours */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-xs font-medium tracking-[0.15em] text-neutral-400 uppercase">
                Durée
              </label>
              <span className="text-sm font-semibold text-neutral-900">{days} jour{days > 1 ? "s" : ""}</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-neutral-300">1 jour</span>
              <span className="text-xs text-neutral-300">30 jours</span>
            </div>
          </div>

          {/* Résultat */}
          {result && (
            <div className="fade-up bg-neutral-900 rounded-3xl p-7 text-white space-y-5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-1">TJM</p>
                  <p className="text-3xl font-semibold">{formatEur(result.daily)}<span className="text-base font-normal text-neutral-400">/j</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] mb-1">Total mission</p>
                  <p className="text-3xl font-semibold">{formatEur(result.total)}</p>
                </div>
              </div>

              <div className="h-px bg-neutral-800" />

              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-[0.15em] mb-2">Fourchette marché</p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-neutral-300">{formatEur(result.min)}</span>
                  <div className="flex-1 h-px bg-neutral-700" />
                  <span className="text-lg font-medium text-neutral-300">{formatEur(result.max)}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 text-center">
                Données marché freelance français · {new Date().getFullYear()}
              </p>
            </div>
          )}

          {!result && (
            <div className="rounded-3xl border border-dashed border-neutral-200 p-7 text-center">
              <p className="text-sm text-neutral-300">Sélectionne un type de mission<br />pour voir ton tarif</p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
