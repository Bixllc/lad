import type { Car } from "@/content";
import { IMAGES } from "@/lib/images.generated";
import BookNow from "./BookNow";
import CarFigure from "./CarFigure";

export default function CarCard({ car }: { car: Car }) {
  const { width, height } = IMAGES[car.image];
  return (
    <article className="flex flex-col rounded-card border border-hairline bg-card p-2.5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative aspect-[16/11] overflow-hidden rounded-well bg-well">
        <div className="absolute inset-x-[18px] top-7 bottom-2.5 flex items-center justify-center" style={{ containerType: "size" }}>
          <CarFigure
            name={car.image}
            alt={`${car.name}, ${car.type.toLowerCase()}`}
            sizes="(min-width: 1100px) 360px, (min-width: 740px) calc(50vw - 80px), calc(100vw - 80px)"
            // Contain the car in the well (cq units) so the shadow stays under the tyres.
            style={{ width: `min(100cqw, ${(width / height).toFixed(3)} * 100cqh)` }}
          />
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-white px-3 py-[7px] text-xs font-semibold text-ink">
          {car.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-3.5 pt-5 pb-3.5">
        <h3 className="text-[22px] font-bold tracking-[-0.01em]">{car.name}</h3>
        <ul className="flex flex-wrap gap-x-[18px] gap-y-1.5">
          {car.specs.map((s) => (
            <li key={s} className="inline-flex items-center gap-2 text-sm text-body">
              <span aria-hidden="true" className="size-[5px] rounded-full bg-brand" />
              {s}
            </li>
          ))}
        </ul>
        <BookNow variant="inline" car={car.name} className="mt-auto" />
      </div>
    </article>
  );
}
