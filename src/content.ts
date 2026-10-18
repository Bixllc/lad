// All editable site content lives here: contact details, fleet, locations, navigation.
import type { ImageName } from "@/lib/images.generated";

export const site = {
  name: "LAD Car Rentals",
  tagline: "Reliable Cars at Affordable Prices",
  description:
    "Clean, dependable rental cars across Jamaica from a locally owned team. Book on WhatsApp or Instagram — Montego Bay, Kingston, Ocho Rios and Negril.",
  // Production URL, used for canonical links, sitemap and Open Graph. Update before launch.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ladcarrentals.com",
};

export const contact = {
  whatsappNumber: "18768238248",
  instagramHandle: "lad_carrentals",
};

export const messages = {
  general: "Hey, I'm interested in booking a car.",
  car: (car: string) => `Hey, I'm interested in booking the ${car}.`,
};

export const links = {
  whatsapp: (text: string = messages.general) =>
    `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`,
  instagramDm: `https://ig.me/m/${contact.instagramHandle}`,
  instagramProfile: `https://www.instagram.com/${contact.instagramHandle}/`,
};

// One-page site: each nav item scrolls to a section id on the home page.
export const nav = [
  { id: "home", label: "Home" },
  { id: "fleet", label: "Our Fleet" },
  { id: "about", label: "About Us" },
];

export type CarType = "Sedan" | "SUV" | "Hatchback";

export type Car = {
  name: string;
  type: CarType;
  image: ImageName;
  specs: string[];
};

const minimum = "3 day minimum";

// Order here is the order shown on the site.
export const fleet: Car[] = [
  { name: "BMW 5 Series", type: "Sedan", image: "fleet-bmw-5", specs: [minimum] },
  { name: "BMW 3 Series", type: "Sedan", image: "fleet-bmw-3", specs: [minimum] },
  { name: "Audi A3", type: "Sedan", image: "fleet-audi-a3", specs: [minimum] },
  { name: "Nissan Altima", type: "Sedan", image: "fleet-nissan-altima", specs: [minimum] },
  { name: "Toyota Axio Hybrid", type: "Sedan", image: "fleet-toyota-axio", specs: [minimum] },
  { name: "BMW X4", type: "SUV", image: "fleet-bmw-x4", specs: [minimum] },
  { name: "Hyundai Tucson", type: "SUV", image: "fleet-hyundai-tucson", specs: [minimum] },
  { name: "Hyundai Tucson Grey", type: "SUV", image: "fleet-hyundai-tucson-grey", specs: [minimum] },
  { name: "Subaru Outback", type: "SUV", image: "fleet-subaru-outback", specs: [minimum] },
  { name: "Toyota Yaris", type: "Hatchback", image: "fleet-toyota-yaris", specs: [minimum] },
  { name: "Honda Fit", type: "Hatchback", image: "fleet-honda-fit", specs: [minimum] },
  { name: "Toyota Aqua Hybrid", type: "Hatchback", image: "fleet-toyota-aqua", specs: [minimum] },
];

export const fleetFilters = ["All", "Cars", "SUVs"] as const;
export type FleetFilter = (typeof fleetFilters)[number];

// Sedans and hatchbacks are grouped as "Cars".
export function carGroup(type: CarType): Exclude<FleetFilter, "All"> {
  return type === "SUV" ? "SUVs" : "Cars";
}

// Areas served: used only in the search-engine structured data (JSON-LD).
export const locations = [
  { city: "Montego Bay", parish: "St. James" },
  { city: "Kingston", parish: "Kingston & St. Andrew" },
  { city: "Ocho Rios", parish: "St. Ann" },
  { city: "Negril", parish: "Westmoreland" },
];

// Set to an image name to replace the About Us photo placeholder.
export const aboutImage: ImageName | null = "about-audi-highway";
