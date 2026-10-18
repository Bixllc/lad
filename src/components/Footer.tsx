import Link from "next/link";
import { links, nav, site } from "@/content";
import BookNow from "./BookNow";
import Img from "./Img";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const iconLink =
  "flex size-9 items-center justify-center rounded-[10px] bg-white/8 transition-colors";

export default function Footer() {
  return (
    <footer className="on-dark px-4 pb-24 nav:pb-4">
      <div className="mx-auto max-w-[1280px] rounded-panel bg-footer px-[clamp(24px,4vw,56px)] pt-[clamp(40px,6vw,64px)] pb-7 text-[#F8F9FA]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-9">
          <div className="flex flex-col gap-3.5">
            <Link href="/" aria-label="LAD Car Rentals home" className="w-fit">
              <Img name="lad-logo-on-dark" alt="LAD Car Rentals" sizes="200px" className="h-auto w-[200px]" />
            </Link>
            <div className="flex gap-2.5">
              <a
                href={links.whatsapp()}
                target="_blank"
                rel="noopener"
                aria-label="Message LAD Car Rentals on WhatsApp"
                title="Message on WhatsApp"
                className={`${iconLink} text-whatsapp hover:bg-whatsapp/25`}
              >
                <WhatsAppIcon />
              </a>
              <a
                href={links.instagramProfile}
                target="_blank"
                rel="noopener"
                aria-label="LAD Car Rentals on Instagram"
                title="Open Instagram"
                className={`${iconLink} text-instagram hover:bg-instagram/25`}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit py-1.5 text-[15px] text-footer-text transition-colors hover:text-footer-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <BookNow variant="stacked" />
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-2.5 border-t border-[#E8E8E8]/10 pt-[22px] text-[13px] text-footer-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="text-footer-accent">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
