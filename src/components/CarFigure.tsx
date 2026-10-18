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
};

/** Car cut-out on a multiply blend with a soft elliptical ground shadow under the tyres. */
export default function CarFigure({ name, alt, sizes, priority, className = "", imgClassName = "", style }: Props) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div aria-hidden="true" className="ground-shadow" />
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
