import Image from "next/image";
import type { Product } from "@/data/team";

/**
 * A browser window with a phone overlapping its corner, showing a product's screenshots.
 * Pass `phone` to show something else on the phone screen (the home hero plays a reel there).
 */
export default function DeviceStage({
  product,
  priority = false,
  phone,
  children,
}: {
  product: Pick<Product, "title" | "displayUrl" | "stage" | "desktop" | "mobile">;
  priority?: boolean;
  phone?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const { desktop, mobile } = product;
  return (
    <div className="stage" style={{ ["--stage" as string]: product.stage }}>
      {children}
      <div className="browser">
        <div className="browser-bar" aria-hidden>
          <i />
          <i />
          <i />
          <span className="browser-url">{product.displayUrl}</span>
        </div>
        <Image
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt={`${product.title} — desktop view`}
          sizes="(max-width: 980px) 92vw, 620px"
          priority={priority}
        />
      </div>
      <div className="phone">
        {phone ?? (
          <Image
            src={mobile.src}
            width={mobile.width}
            height={mobile.height}
            alt={`${product.title} — mobile view`}
            sizes="170px"
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
