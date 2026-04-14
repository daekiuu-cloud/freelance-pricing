import Link from "next/link"

const features = [
  {
    label: "Données marché réelles",
    description: "Tarifs calibrés sur le marché freelance français, par spécialité et niveau d'expérience.",
  },
  {
    label: "Résultat instantané",
    description: "Ajuste les sliders, le tarif se met à jour en temps réel. Pas de formulaire, pas d'attente.",
  },
  {
    label: "Fourchette marché",
    description: "Au-delà du prix exact, visualise la fourchette haute et basse pour négocier en confiance.",
  },
]

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] flex flex-col">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-5xl mx-auto w-full">
        <span className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">Freelance Pricing</span>
        <Link
          href="/calculator"
          className="text-xs font-medium text-neutral-900 border border-neutral-200 rounded-full px-4 py-2 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
        >
          Lancer l'outil →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center px-8 max-w-5xl mx-auto w-full py-24">
        <p className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase mb-6">
          Outil gratuit · Marché français
        </p>
        <h1 className="text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-8 max-w-xl">
          Arrête de<br />
          sous-facturer.
        </h1>
        <p className="text-lg text-neutral-400 max-w-sm leading-relaxed mb-12">
          Un calculateur de tarifs freelance pensé pour les créatifs — photo, vidéo, design.
          Calibré sur les données du marché français.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/calculator"
            className="bg-neutral-900 text-white text-sm font-medium px-7 py-4 rounded-2xl hover:bg-neutral-700 transition-all"
          >
            Calculer mon tarif
          </Link>
          <span className="text-xs text-neutral-300">Gratuit · Aucune inscription</span>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-neutral-200 max-w-5xl mx-auto w-full" />

      {/* Features */}
      <section className="px-8 py-20 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i}>
              <p className="text-xs text-neutral-300 mb-3">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">{f.label}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA block */}
      <section className="px-8 pb-24 max-w-5xl mx-auto w-full">
        <div className="bg-neutral-900 rounded-3xl p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Prêt à facturer au juste prix ?</h2>
            <p className="text-sm text-neutral-400">Ça prend 30 secondes.</p>
          </div>
          <Link
            href="/calculator"
            className="shrink-0 bg-white text-neutral-900 text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-neutral-100 transition-all text-center"
          >
            Calculer mon tarif →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-8 py-6 max-w-5xl mx-auto w-full flex justify-between items-center">
        <span className="text-xs text-neutral-300">© {new Date().getFullYear()} Freelance Pricing</span>
        <span className="text-xs text-neutral-300">Données marché France 🇫🇷</span>
      </footer>

    </main>
  )
}
