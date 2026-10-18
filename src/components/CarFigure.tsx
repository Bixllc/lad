import type { CSSProperties } from "react";
import type { ImageName } from "@/lib/images.generated";
import Img from "./Img";

type Props = {
  name: ImageName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /**
   * "soft": a light ellipse, for cars inside cards.
   * "grounded": seats the car on the page like the hero: a soft floor glow behind it,
   * a cast shadow made from the car's own silhouette, and contact shadows under the tyres.
   */
  shadow?: "soft" | "grounded";
};

/** Car cut-out with a ground shadow under the tyres. */
export default function CarFigure({ name, alt, sizes, priority, className = "", imgClassName = "", style, shadow = "soft" }: Props) {
  return (
    <div className={`relative ${className}`} style={style}>
      {shadow === "grounded" ? (
        <>
          <div aria-hidden="true" className="floor-glow" />
          {/* Cast shadow: the car's silhouette flattened onto the ground and blurred. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50 blur-[10px]">
            <Img
              name={name}
              alt=""
              sizes={sizes}
              className="absolute inset-x-0 bottom-0 h-auto w-full origin-bottom translate-y-[3%] scale-y-[0.12] brightness-0"
            />
          </div>
          <div aria-hidden="true" className="contact-shadow" />
        </>
      ) : (
        <div aria-hidden="true" className="ground-shadow" />
      )}
      <Img
        name={name}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`relative block h-auto w-full mix-blend-multiply ${imgClassName}`}
      />
    </div>
  );
}
