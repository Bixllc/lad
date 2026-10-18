"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav } from "@/content";
import BookNow from "./BookNow";
import Img from "./Img";
import { Close, Menu } from "./icons";

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export default function Header() {
  const pathname = normalize(usePathname() ?? "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkState = (href: string) =>
    pathname === href
      ? { "aria-current": "page" as const, className: "bg-brand/10 text-ink" }
      : { className: "text-body hover:bg-ink/5 hover:text-ink" };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3.5">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-full border border-ink/6 bg-white/90 p-2 shadow-header backdrop-blur-[14px]">
        <Link href="/" aria-label="LAD Car Rentals home" className="flex h-12 shrink-0 items-center rounded-full px-1 sm:px-2">
          <Img name="lad-logo-on-light" alt="LAD Car Rentals" priority sizes="120px" className="h-10 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 nav:flex">
          {nav.map((item) => {
            const { className, ...aria } = linkState(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                {...aria}
                className={`rounded-btn px-4 py-2.5 text-[15px] font-medium transition-colors ${className}`}
              >
                {item.label}
              </Link>
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
          const { className, ...aria } = linkState(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              {...aria}
              onClick={() => setMenuOpen(false)}
              className={`rounded-[18px] px-[18px] py-4 text-[17px] font-semibold ${className}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
