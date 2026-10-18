"use client";

import { useState } from "react";
import { carGroup, fleet, fleetFilters, type FleetFilter } from "@/content";
import CarCard from "./CarCard";

export default function FleetSection() {
  const [filter, setFilter] = useState<FleetFilter>("All");
  const shown = filter === "All" ? fleet : fleet.filter((c) => carGroup(c.type) === filter);

  return (
    <section id="fleet" aria-labelledby="fleet-heading" className="mx-auto max-w-[1280px] anchor px-5 pt-[clamp(88px,11vw,152px)]">
      <div className="reveal mb-11 flex flex-col items-center gap-6 text-center">
        <h2 id="fleet-heading" className="display text-h2 font-normal">
          Our Full <span className="accent">Fleet</span>
        </h2>
        <div role="group" aria-label="Filter vehicles" className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-ink/6 bg-card p-[5px]">
          {fleetFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`h-11 cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors ${
                filter === f ? "bg-brand-fill text-white" : "text-body hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-sm font-medium text-body">
          {shown.length} {shown.length === 1 ? "vehicle" : "vehicles"}
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-6">
        {shown.map((car) => (
          <div key={car.name} className="reveal flex [&>*]:flex-1">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  );
}
