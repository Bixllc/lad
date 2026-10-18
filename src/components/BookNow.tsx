"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { links, messages } from "@/content";
import { ArrowRight, ChevronDown, Close } from "./icons";

type Channel = "whatsapp" | "instagram";
type Option = { channel: Channel; label: string };

const DEFAULT_OPTIONS: Option[] = [
  { channel: "whatsapp", label: "Message on WhatsApp" },
  { channel: "instagram", label: "Instagram DM" },
];

function hrefFor(channel: Channel, whatsappText: string) {
  return channel === "whatsapp" ? links.whatsapp(whatsappText) : links.instagramDm;
}

const external = { target: "_blank", rel: "noopener" } as const;

/** Closes on outside pointer-down and on Escape (returning focus to the trigger). */
function useDismiss(
  open: boolean,
  close: (opts?: { focusTrigger?: boolean }) => void,
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close({ focusTrigger: true });
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, rootRef]);
}

/* ------------------------------------------------------------------ */
/* Shared "only one inline card open" store                            */
/* ------------------------------------------------------------------ */

let openInlineId: string | null = null;
const inlineListeners = new Set<() => void>();
function setOpenInline(id: string | null) {
  openInlineId = id;
  inlineListeners.forEach((l) => l());
}
function subscribeInline(l: () => void) {
  inlineListeners.add(l);
  return () => void inlineListeners.delete(l);
}

/* ------------------------------------------------------------------ */

type BaseProps = {
  /** Prefilled WhatsApp message. Defaults to the general booking message. */
  whatsappText?: string;
  className?: string;
};

type PopoverProps = BaseProps & {
  variant?: "popover";
  label?: string;
  options?: Option[];
  size?: "md" | "lg";
  align?: "start" | "center" | "end";
};

type InlineProps = BaseProps & {
  variant: "inline";
  /** Car name: used for the prefilled message and accessible labels. */
  car: string;
};

type StackedProps = BaseProps & {
  variant: "stacked";
  label?: string;
  options?: Option[];
};

export type BookNowProps = PopoverProps | InlineProps | StackedProps;

export default function BookNow(props: BookNowProps) {
  if (props.variant === "inline") return <InlineBook {...props} />;
  if (props.variant === "stacked") return <StackedBook {...props} />;
  return <PopoverBook {...props} />;
}

/* ------------------------------------------------------------------ */

function PopoverBook({
  whatsappText = messages.general,
  label = "Book Now",
  options = DEFAULT_OPTIONS,
  size = "lg",
  align = "center",
  className = "",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();
  const triggerId = useId();

  const close = useCallback((opts?: { focusTrigger?: boolean }) => {
    setOpen(false);
    if (opts?.focusTrigger) triggerRef.current?.focus();
  }, []);
  useDismiss(open, close, rootRef);

  // Menu-button pattern: move focus into the menu when it opens.
  useEffect(() => {
    if (open) itemRefs.current[0]?.focus();
  }, [open]);

  const onMenuKey = (e: ReactKeyboardEvent) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const go = (n: number) => {
      e.preventDefault();
      items[(n + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Tab") setOpen(false);
  };

  const onTriggerKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const sizeCls =
    size === "lg"
      ? "h-[58px] px-9 text-base font-semibold"
      : "h-12 whitespace-nowrap px-4 text-sm font-bold sm:px-[22px]";

  return (
    <div ref={rootRef} className={`relative inline-flex flex-col items-center ${className}`}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKey}
        className={`inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-btn bg-brand-fill text-white transition-colors hover:bg-brand-hover ${sizeCls}`}
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 pt-3 ${
            align === "center"
              ? "left-1/2 w-[280px] -translate-x-1/2"
              : align === "start"
                ? "left-0 w-[280px]"
                : "right-0 w-[260px]"
          }`}
        >
          <div
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            onKeyDown={onMenuKey}
            className={`flex animate-pop flex-col gap-1.5 rounded-2xl border border-ink/8 bg-card p-2 shadow-pop ${
              align === "center" ? "origin-top" : align === "start" ? "origin-top-left" : "origin-top-right"
            }`}
          >
            {options.map((o, i) => (
              <a
                key={o.channel}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitem"
                href={hrefFor(o.channel, whatsappText)}
                {...external}
                onClick={() => setOpen(false)}
                className="flex h-[52px] items-center justify-between rounded-[10px] px-[18px] text-[15px] font-semibold text-ink transition-colors hover:bg-well focus-visible:bg-well"
              >
                {o.label}
                <ArrowRight className="text-brand" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function InlineBook({ car, whatsappText = messages.car(car), className = "" }: InlineProps) {
  const id = useId();
  const openId = useSyncExternalStore(subscribeInline, () => openInlineId, () => null);
  const open = openId === id;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const focusTriggerOnClose = useRef(false);
  const wasOpen = useRef(false);

  const close = useCallback(
    (opts?: { focusTrigger?: boolean }) => {
      if (openInlineId !== id) return;
      focusTriggerOnClose.current = !!opts?.focusTrigger;
      setOpenInline(null);
    },
    [id],
  );
  useDismiss(open, close, rootRef);

  useEffect(() => {
    if (open) firstRef.current?.focus();
    else if (wasOpen.current && focusTriggerOnClose.current) triggerRef.current?.focus();
    wasOpen.current = open;
    focusTriggerOnClose.current = false;
  }, [open]);

  const btn = "flex h-[52px] items-center justify-center rounded-btn px-3 text-sm font-bold transition-colors";

  return (
    <div ref={rootRef} className={className}>
      {open ? (
        <div role="group" aria-label={`Book the ${car}`} className="grid animate-pop grid-cols-[1fr_1fr_auto] gap-2">
          <a
            ref={firstRef}
            href={links.whatsapp(whatsappText)}
            {...external}
            onClick={() => close()}
            className={`${btn} bg-brand-fill text-white hover:bg-brand-hover`}
          >
            WhatsApp
          </a>
          <a
            href={links.instagramDm}
            {...external}
            onClick={() => close()}
            className={`${btn} bg-ink text-white hover:bg-[#2A302C]`}
          >
            Instagram DM
          </a>
          <button
            type="button"
            aria-label="Close booking options"
            onClick={() => close({ focusTrigger: true })}
            className={`${btn} w-[52px] cursor-pointer bg-well px-0 text-body hover:text-ink`}
          >
            <Close />
          </button>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          aria-label={`Book Now: ${car}`}
          onClick={() => setOpenInline(id)}
          className="group/book flex h-[52px] w-full cursor-pointer items-center justify-between rounded-btn bg-well pr-2 pl-[22px] text-sm font-bold text-ink transition-colors hover:bg-brand-fill hover:text-white"
        >
          Book Now
          <span className="flex size-[38px] items-center justify-center rounded-full bg-brand-fill text-white transition-colors group-hover/book:bg-white group-hover/book:text-brand">
            <ArrowRight />
          </span>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STACKED_OPTIONS: Option[] = [
  { channel: "whatsapp", label: "Message on WhatsApp" },
  { channel: "instagram", label: "Message on Instagram" },
];

function StackedBook({
  whatsappText = messages.general,
  label = "Book Now",
  options = STACKED_OPTIONS,
  className = "",
}: StackedProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const close = useCallback((opts?: { focusTrigger?: boolean }) => {
    setOpen(false);
    if (opts?.focusTrigger) triggerRef.current?.focus();
  }, []);
  useDismiss(open, close, rootRef);

  return (
    <div ref={rootRef} className={`flex flex-col gap-2.5 ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[50px] cursor-pointer items-center justify-center gap-2.5 rounded-btn bg-brand-fill text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <ul id={listId} hidden={!open} className="flex animate-pop flex-col gap-2.5 origin-top">
        {options.map((o) => (
          <li key={o.channel}>
            <a
              href={hrefFor(o.channel, whatsappText)}
              {...external}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-between rounded-btn bg-[#F8F9FA] px-4 text-sm font-semibold text-footer transition-colors hover:bg-white hover:text-brand"
            >
              {o.label}
              <ArrowRight className="text-brand" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
