"use client";

import { useEffect, useId, useState } from "react";
import { nav } from "@/content";
import BookNow from "./BookNow";
import Img from "./Img";
import { Close, Menu } from "./icons";

/** Scroll-spy: the nav section currently around the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = nav.map((n) => n.id);

export default function Header() {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkState = (id: string) =>
    active === id
      ? { "aria-current": "location" as const, className: "bg-brand/10 text-ink" }
      : { className: "text-body hover:bg-ink/5 hover:text-ink" };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3.5">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full border border-ink/6 bg-white/90 p-2 shadow-header backdrop-blur-[14px]">
        <a href="#home" aria-label="LAD Car Rentals home" className="flex h-12 shrink-0 items-center rounded-full px-1 sm:px-2">
          <Img name="lad-logo-on-light" alt="LAD Car Rentals" priority sizes="120px" className="h-10 w-auto sm:h-12" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-0.5 nav:flex">
          {nav.map((item) => {
            const { className, ...aria } = linkState(item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                {...aria}
                className={`rounded-btn px-4 py-2.5 text-[15px] font-medium transition-colors ${className}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <BookNow
            label="Contact Us"
            size="md"
            align="end"
            options={[
              { channel: "instagram", label: "Message on Instagram" },
              { channel: "whatsapp", label: "Message on WhatsApp" },
            ]}
          />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-btn border border-line bg-white text-ink nav:hidden"
          >
            {menuOpen ? <Close className="size-5" /> : <Menu />}
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!menuOpen}
        className="absolute inset-x-4 top-full mx-auto mt-2 flex max-w-[1280px] animate-pop origin-top flex-col gap-0.5 rounded-card border border-ink/6 bg-white p-2.5 shadow-[0_20px_50px_rgb(15_21_18/0.1)] nav:hidden"
      >
        {nav.map((item) => {
          const { className, ...aria } = linkState(item.id);
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              {...aria}
              onClick={() => setMenuOpen(false)}
              className={`rounded-[18px] px-[18px] py-4 text-[17px] font-semibold ${className}`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
