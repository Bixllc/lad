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
  /** "strong" matches the hero car's shadow weight; "soft" suits cards. */
  shadow?: "soft" | "strong";
};

/** Car cut-out on a multiply blend with a soft elliptical ground shadow under the tyres. */
export default function CarFigure({ name, alt, sizes, priority, className = "", imgClassName = "", style, shadow = "soft" }: Props) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div aria-hidden="true" className={shadow === "strong" ? "ground-shadow-strong" : "ground-shadow"} />
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
