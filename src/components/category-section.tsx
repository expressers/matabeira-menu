import { Badge } from "@/components/ui/badge"
import { Emblem, Flourish, PalmFrond, PaperCorner } from "@/components/ornaments"
import { formatKz, type MenuCategory, type MenuItem } from "@/data/menu"
import { cn } from "@/lib/utils"

function ItemRow({ item, tone }: { item: MenuItem; tone: MenuCategory["tone"] }) {
  return (
    <li className="flex items-baseline gap-2 py-1.5">
      <span className="min-w-0">
        <span
          className={cn(
            "text-[1.12rem] leading-snug font-medium",
            tone === "dark" ? "text-gold-200" : "text-paper-ink",
          )}
        >
          {item.name}
        </span>
        {item.serves && (
          <Badge
            variant="outline"
            className={cn(
              "ml-2 h-[1.15rem] translate-y-[-2px] rounded-full px-1.5 font-display text-[0.6rem] tracking-wider uppercase",
              tone === "dark"
                ? "border-gold-500/50 text-gold-300"
                : "border-paper-gold/50 text-paper-gold",
            )}
          >
            {item.serves}
          </Badge>
        )}
      </span>
      <span className={cn("leader", tone === "dark" ? "text-gold-400" : "text-paper-gold")} />
      <span
        className={cn(
          "shrink-0 font-display text-[0.95rem] font-semibold tabular-nums tracking-wide",
          tone === "dark" ? "text-gold-300" : "text-paper-gold",
        )}
      >
        {formatKz(item.price)}
      </span>
    </li>
  )
}

function GroupTitle({ title, tone, hidden }: { title: string; tone: MenuCategory["tone"]; hidden?: boolean }) {
  if (hidden) return null
  return (
    <div className="mt-7 mb-2 flex flex-col items-center first:mt-2">
      <h3
        className={cn(
          "font-display text-sm font-semibold tracking-[0.28em] uppercase",
          tone === "dark" ? "text-gold-300" : "text-paper-gold",
        )}
      >
        {title}
      </h3>
      <span
        className={cn(
          "mt-1.5 h-px w-24",
          tone === "dark" ? "gold-rule" : "bg-gradient-to-r from-transparent via-paper-gold/60 to-transparent",
        )}
      />
    </div>
  )
}

export function CategorySection({ category }: { category: MenuCategory }) {
  const { tone } = category
  const single = category.groups.length === 1 && category.groups[0].title === category.title
  const twoCols = category.groups.length > 2

  return (
    <section id={category.id} data-category={category.id} className="scroll-mt-36">
      <div
        className={cn(
          "relative mx-auto overflow-hidden rounded-[3px] px-5 pt-10 pb-9 sm:px-10",
          tone === "paper" && "px-7 pb-14 sm:px-12",
          tone === "dark" ? "frame-dark" : "frame-paper",
        )}
      >
        {tone === "dark" ? (
          <>
            <PalmFrond className="absolute -top-6 -left-8 w-32 opacity-80 sm:w-40" />
            <PalmFrond className="absolute -top-6 -right-8 w-32 -scale-x-100 opacity-80 sm:w-40" />
          </>
        ) : (
          <>
            <PaperCorner className="top-3 left-3" />
            <PaperCorner className="top-3 right-3 -scale-x-100" />
            <PaperCorner className="bottom-3 left-3 -scale-y-100" />
            <PaperCorner className="right-3 bottom-3 -scale-100" />
          </>
        )}

        <header className="relative flex flex-col items-center text-center">
          {tone === "dark" && <Emblem className="mb-4 size-16" />}
          <h2
            className={cn(
              "font-display text-[1.7rem] leading-tight font-semibold tracking-[0.08em] uppercase sm:text-4xl",
              tone === "dark" ? "gold-text" : "text-paper-gold",
            )}
          >
            {category.title}
          </h2>
          {category.subtitle && (
            <p className={cn("mt-1.5 text-[0.95rem] italic", tone === "dark" ? "text-gold-200/70" : "text-paper-ink/70")}>
              {category.subtitle}
            </p>
          )}
          <Flourish className="mt-3" />
        </header>

        <div className={cn("relative mt-4", twoCols && "md:columns-2 md:gap-12")}>
          {category.groups.map((group) => (
            <div key={group.id} className="break-inside-avoid">
              <GroupTitle title={group.title} tone={tone} hidden={single} />
              <ul>
                {group.items.map((item) => (
                  <ItemRow key={item.name} item={item} tone={tone} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
