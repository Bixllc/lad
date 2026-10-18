import BookNow from "@/components/BookNow";
import CarFigure from "@/components/CarFigure";
import FleetSection from "@/components/FleetSection";
import AboutSection from "@/components/AboutSection";
import { links } from "@/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="home" aria-label="Introduction" className="relative scroll-mt-28 overflow-x-clip bg-[radial-gradient(ellipse_75%_50%_at_50%_62%,#E6E9E5_0%,#F6F7F4_72%)]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center px-5 pt-[clamp(56px,9vw,120px)] pb-[clamp(40px,5vw,64px)] text-center">
          <h1 className="display text-hero">
            Reliable Cars at
            <span className="accent block">Affordable Prices</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-lead leading-[1.6] text-body">
            Clean, dependable vehicles across Jamaica. Local service you can trust.
          </p>
          <BookNow className="z-20 mt-9" />

          <CarFigure
            name="hero-bmw"
            alt="Black BMW sedan from the LAD Car Rentals fleet"
            priority
            sizes="(min-width: 1160px) 1120px, 100vw"
            shadow="grounded"
            className="mt-[clamp(32px,5vw,64px)] mb-6 w-full max-w-[1120px]"
          />
        </div>
      </section>

      <FleetSection />

      {/* Why Drive with LAD */}
      <section aria-labelledby="why-heading" className="overflow-x-clip pt-[clamp(88px,11vw,152px)] pb-8">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,5vw,64px)] px-5">
          <div className="reveal flex max-w-[560px] flex-col items-start gap-6">
            <h2 id="why-heading" className="display text-h2-lg font-normal leading-[1.04]">
              Why Drive with <span className="accent">LAD Car Rentals?</span>
            </h2>
            <p className="max-w-[480px] text-[clamp(16px,1.5vw,18px)] leading-[1.65] text-body">
              A local Jamaican team with clean, reliable cars, fair rates and quick replies. We&rsquo;ll help you
              rent with confidence.
            </p>
            <a
              href={links.whatsapp()}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex h-[58px] items-center justify-center rounded-btn bg-ink px-8 text-base font-semibold text-white transition-colors hover:bg-brand-fill"
            >
              Book your car
            </a>
          </div>
          <CarFigure
            name="why-hyundai-grey"
            alt="Grey Hyundai Tucson with an LAD Car Rentals plate"
            sizes="(min-width: 960px) 720px, 110vw"
            shadow="grounded"
            className="reveal -mr-[18%] w-[118%]"
          />
        </div>
      </section>

      <AboutSection />

      {/* CTA band */}
      <section id="contact" aria-labelledby="contact-heading" className="anchor mx-auto max-w-[1280px] px-5 pt-[clamp(88px,11vw,152px)] pb-[clamp(64px,8vw,104px)]">
        <div className="reveal flex flex-col items-center gap-5 rounded-panel border border-hairline bg-card px-6 py-[clamp(52px,8vw,104px)] text-center">
          <h2 id="contact-heading" className="display max-w-[780px] text-h2-lg font-normal">
            Ready to explore <span className="accent">Jamaica?</span>
          </h2>
          <p className="max-w-[520px] text-lead leading-[1.6] text-body">
            Message us on Instagram or WhatsApp to book your car today.
          </p>
          <BookNow className="mt-2.5" />
        </div>
      </section>
    </>
  );
}
