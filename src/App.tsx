import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, MapPin, Phone, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategorySection } from "@/components/category-section"
import { Emblem, Flourish, PalmFrond } from "@/components/ornaments"
import { MENU, RESORT, normalize, type MenuCategory } from "@/data/menu"
import { cn } from "@/lib/utils"

type Section = MenuCategory["section"]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3Z" />
    </svg>
  )
}

function Hero({ onEnter }: { onEnter: (s: Section) => void }) {
  return (
    <header className="relative isolate flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-6 pt-14 pb-20 text-center">
      <PalmFrond tone="green" className="absolute -top-10 -left-16 -z-10 w-72 opacity-70 sm:w-96" />
      <PalmFrond tone="green" className="absolute -top-10 -right-16 -z-10 w-72 -scale-x-100 opacity-70 sm:w-96" />
      <PalmFrond className="absolute -bottom-12 -left-14 -z-10 w-56 -scale-y-100 opacity-60 sm:w-80" />
      <PalmFrond className="absolute -right-14 -bottom-12 -z-10 w-56 -scale-100 opacity-60 sm:w-80" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(60%_45%_at_50%_42%,rgba(233,204,138,0.14),transparent_70%)]" />

      <Emblem className="size-28 animate-in fade-in zoom-in-95 duration-700 sm:size-32" />

      <p className="mt-8 font-display text-xs tracking-[0.6em] text-gold-300/90 uppercase animate-in fade-in slide-in-from-bottom-2 duration-700">
        Resort
      </p>
      <h1 className="gold-text mt-1 font-display text-[3.3rem] leading-none font-bold tracking-[0.06em] uppercase animate-in fade-in slide-in-from-bottom-3 duration-1000 sm:text-7xl">
        {RESORT.name}
      </h1>
      <p className="mt-3 font-script text-3xl text-gold-200/90 animate-in fade-in duration-1000 sm:text-4xl">
        {RESORT.tagline}
      </p>

      <Flourish className="mt-7 w-56" />

      <p className="mt-6 font-display text-lg tracking-[0.35em] text-gold-200 uppercase">Menu</p>
      <p className="font-display text-sm tracking-[0.3em] text-gold-300/80 uppercase">Restaurante &amp; Bar</p>

      <div className="mt-10 grid w-full max-w-xs grid-cols-2 gap-3">
        <Button
          size="lg"
          className="h-12 rounded-full font-display tracking-[0.18em] uppercase"
          onClick={() => onEnter("restaurante")}
        >
          Restaurante
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 rounded-full border-gold-400/70 bg-transparent font-display tracking-[0.18em] text-gold-200 uppercase hover:bg-gold-400/10 hover:text-gold-100"
          onClick={() => onEnter("bar")}
        >
          Bar
        </Button>
      </div>

      <p className="mt-8 flex items-center gap-1.5 text-sm text-gold-200/60 italic">
        <MapPin className="size-3.5" /> {RESORT.location}
      </p>

      <button
        type="button"
        onClick={() => onEnter("restaurante")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-300/70 transition hover:text-gold-200"
        aria-label="Ver o menu"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </button>
    </header>
  )
}

export default function App() {
  const [section, setSection] = useState<Section>("restaurante")
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [active, setActive] = useState<string>(MENU[0].id)
  const menuRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = normalize(query.trim())

  const visible = useMemo<MenuCategory[]>(() => {
    if (!q) return MENU.filter((c) => c.section === section)
    return MENU.map((c) => ({
      ...c,
      groups: c.groups
        .map((g) => ({
          ...g,
          items: normalize(g.title).includes(q) ? g.items : g.items.filter((i) => normalize(i.name).includes(q)),
        }))
        .filter((g) => g.items.length > 0),
    })).filter((c) => c.groups.length > 0)
  }, [q, section])

  const resultCount = visible.reduce((n, c) => n + c.groups.reduce((m, g) => m + g.items.length, 0), 0)

  // Scrollspy: destaca a categoria visível
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-category]")
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: "-140px 0px -55% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [visible])

  // Mantém o chip activo visível na barra
  useEffect(() => {
    const bar = chipsRef.current
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    if (bar && chip) {
      bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" })
    }
  }, [active])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  const enter = (s: Section) => {
    setSection(s)
    setQuery("")
    requestAnimationFrame(() => menuRef.current?.scrollIntoView({ behavior: "smooth" }))
  }

  const switchSection = (s: Section) => {
    setSection(s)
    setQuery("")
    const first = MENU.find((c) => c.section === s)
    if (first) setActive(first.id)
    menuRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const navRef = useRef<HTMLElement>(null)
  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = (navRef.current?.offsetHeight ?? 0) + 16
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
  }

  const closeSearch = () => {
    setQuery("")
    setSearchOpen(false)
  }

  return (
    <div className="wood min-h-dvh">
      <Hero onEnter={enter} />

      <div ref={menuRef} className="scroll-mt-0">
        {/* Barra fixa */}
        <nav ref={navRef} className="sticky top-0 z-30 border-b border-gold-500/25 bg-wood-950/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 pt-3">
            {searchOpen ? (
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gold-300/70" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Procurar prato ou bebida…"
                  className="h-10 rounded-full border-gold-500/40 bg-wood-900/60 pl-9 text-base text-gold-100 placeholder:text-gold-200/40"
                  aria-label="Procurar no menu"
                />
              </div>
            ) : (
              <div className="grid flex-1 grid-cols-2 rounded-full border border-gold-500/35 p-1" role="tablist">
                {(["restaurante", "bar"] as const).map((s) => (
                  <button
                    key={s}
                    role="tab"
                    aria-selected={section === s}
                    onClick={() => switchSection(s)}
                    className={cn(
                      "h-8 rounded-full font-display text-[0.72rem] font-semibold tracking-[0.22em] uppercase transition",
                      section === s ? "bg-gold-400 text-wood-950 shadow" : "text-gold-200/80 hover:text-gold-100",
                    )}
                  >
                    {s === "restaurante" ? "Restaurante" : "Bar"}
                  </button>
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-full text-gold-200 hover:bg-gold-400/10 hover:text-gold-100"
              onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
              aria-label={searchOpen ? "Fechar pesquisa" : "Procurar"}
            >
              {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </Button>
          </div>

          <div ref={chipsRef} className="no-scrollbar mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pt-3 pb-3">
            {q ? (
              <p className="py-1 text-sm text-gold-200/70 italic">
                {resultCount === 0 ? "Nenhum resultado" : `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"}`} para “{query.trim()}”
              </p>
            ) : (
              visible.map((c) => (
                <button
                  key={c.id}
                  data-chip={c.id}
                  onClick={() => goTo(c.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 font-display text-[0.68rem] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition",
                    active === c.id
                      ? "border-gold-400 bg-gold-400/15 text-gold-100"
                      : "border-gold-500/25 text-gold-200/70 hover:border-gold-400/60",
                  )}
                >
                  {c.short}
                </button>
              ))
            )}
          </div>
        </nav>

        <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:gap-14 sm:py-14">
          {visible.map((c) => (
            <CategorySection key={c.id} category={c} />
          ))}
          {q && resultCount === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-gold-200/80 italic">Não encontrámos nada com esse nome.</p>
              <Button variant="link" className="mt-2 text-gold-300" onClick={closeSearch}>
                Ver o menu completo
              </Button>
            </div>
          )}
        </main>

        <footer className="relative overflow-hidden border-t border-gold-500/25 bg-palm-deep/90 px-6 pt-12 pb-10 text-center">
          <PalmFrond tone="green" className="absolute -bottom-16 -left-16 w-60 opacity-50" />
          <PalmFrond tone="green" className="absolute -right-16 -bottom-16 w-60 -scale-x-100 opacity-50" />
          <div className="relative mx-auto max-w-md">
            <Emblem className="mx-auto size-16" />
            <p className="mt-4 font-display text-xs tracking-[0.35em] text-gold-300 uppercase">Reservas e informações</p>
            <div className="mt-3 flex flex-col items-center gap-1">
              {RESORT.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:+244${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-display text-2xl font-semibold tracking-wider text-gold-100 hover:text-gold-300"
                >
                  <Phone className="size-4 text-gold-300" /> {p}
                </a>
              ))}
            </div>
            <Button
              render={
                <a
                  href={`https://wa.me/${RESORT.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de fazer uma reserva no Resort Matabeira.")}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              size="lg"
              className="mt-6 h-12 rounded-full px-6 font-display tracking-[0.15em] uppercase"
            >
              <WhatsAppIcon className="size-5" /> Reservar pelo WhatsApp
            </Button>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-gold-200/70 italic">
              <MapPin className="size-4" /> {RESORT.location}
            </p>
            <div className="gold-rule mx-auto mt-8 w-40" />
            <p className="mt-4 text-sm text-gold-200/55 italic">
              Preços em Kwanza (Kz) · Sujeito a disponibilidade
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
