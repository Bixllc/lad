import { links, locations, messages } from "@/content";
import Img from "./Img";
import Placeholder from "./Placeholder";

export default function LocationsSection() {
  return (
    <section id="locations" aria-labelledby="locations-heading" className="mx-auto max-w-[1280px] anchor px-5 pt-[clamp(88px,11vw,152px)]">
      <div className="reveal mx-auto mb-11 flex max-w-[640px] flex-col items-center gap-5 text-center">
        <h2 id="locations-heading" className="display text-h2 font-normal">
          Our <span className="accent">Locations</span>
        </h2>
        <p className="text-lead leading-[1.6] text-body">
          Convenient pickup points across the island. Message us to arrange the best option for you.
        </p>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
        {locations.map((loc) => (
          <li key={loc.city} className="reveal flex flex-col rounded-card border border-hairline bg-card p-2.5 shadow-card">
            <div className="relative aspect-[4/3] overflow-hidden rounded-well">
              {loc.image ? (
                <Img name={loc.image} alt={`${loc.city}, ${loc.parish}`} sizes="(min-width: 1100px) 300px, (min-width: 640px) 50vw, 100vw" className="size-full object-cover" />
              ) : (
                <Placeholder label={`${loc.city} photo`} icon />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1.5 px-3.5 pt-5 pb-3.5">
              <span className="text-sm font-medium text-brand-fill">{loc.parish}</span>
              <h3 className="text-[26px] font-bold tracking-[-0.01em]">{loc.city}</h3>
              <a
                href={links.whatsapp(messages.pickup(loc.city))}
                target="_blank"
                rel="noopener"
                aria-label={`Arrange pickup in ${loc.city} on WhatsApp`}
                className="mt-[18px] flex h-[52px] items-center justify-center rounded-btn bg-brand-fill px-4 text-center text-sm font-bold text-white transition-colors hover:bg-brand-hover"
              >
                Arrange pickup
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
