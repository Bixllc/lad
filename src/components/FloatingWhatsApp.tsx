import { links } from "@/content";

/** Mobile-only (<960px) WhatsApp shortcut fixed to the bottom-right. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={links.whatsapp()}
      target="_blank"
      rel="noopener"
      aria-label="Message us on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-[54px] items-center gap-2.5 rounded-btn bg-brand-fill px-[22px] text-sm font-bold text-white shadow-[0_14px_34px_rgb(26_143_60/0.35)] transition-colors hover:bg-brand-hover nav:hidden"
    >
      <span aria-hidden="true" className="size-2 rounded-full bg-footer-accent shadow-[0_0_0_3px_rgb(46_204_113/0.35)]" />
      WhatsApp
    </a>
  );
}
