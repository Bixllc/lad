import { aboutImage } from "@/content";
import BookNow from "./BookNow";
import Img from "./Img";
import Placeholder from "./Placeholder";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto anchor grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(36px,6vw,88px)] px-5 pt-[clamp(88px,11vw,152px)]">
      <div className="reveal flex flex-col items-start gap-6">
        <span className="text-sm font-semibold text-brand-hover">Locally owned · Jamaican</span>
        <h2 id="about-heading" className="display text-h2-lg font-normal">
          About <span className="accent whitespace-nowrap">LAD Car Rentals</span>
        </h2>
        <p className="text-[clamp(19px,2vw,24px)] leading-[1.45] font-semibold text-ink">
          A locally owned Jamaican company focused on one simple promise —{" "}
          <span className="text-brand-hover">reliable cars at affordable prices.</span>
        </p>
        <p className="text-[17px] leading-[1.75] text-body">
          We keep our vehicles clean, well-maintained and ready for the roads of Jamaica. Whether you&rsquo;re a
          visitor exploring the island or a local who needs a dependable ride, we&rsquo;re here to make it easy.
        </p>
        <p className="text-[17px] leading-[1.75] text-body">
          Our team believes in honest service, clear communication, and treating every customer like family.
        </p>
        <BookNow label="Learn More" align="start" className="mt-2" />
      </div>
      <div className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-[32px]">
        {aboutImage ? (
          <Img name={aboutImage} alt="White Audi A3 with an LAD Car Rentals plate driving down a sunny highway" sizes="(min-width: 1280px) 600px, (min-width: 960px) 46vw, calc(100vw - 40px)" className="size-full object-cover object-[50%_62%]" />
        ) : (
          <Placeholder label="Team or lifestyle photo" />
        )}
      </div>
    </section>
  );
}
