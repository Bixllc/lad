import Image, { type ImageProps } from "next/image";
import { IMAGES, type ImageName } from "@/lib/images.generated";

type Props = Omit<ImageProps, "src" | "width" | "height"> & { name: ImageName };

/** next/image wrapper for the pre-optimised images in public/img. */
export default function Img({ name, ...rest }: Props) {
  const { width, height, v } = IMAGES[name];
  return <Image src={`${name}?v=${v}`} width={width} height={height} {...rest} />;
}
