import BookNow from "./BookNow";

/** Mobile-only (<960px) Book Now button fixed to the bottom-right; the menu opens upward. */
export default function FloatingBookNow() {
  return (
    <div className="fixed right-4 bottom-4 z-40 nav:hidden">
      <BookNow
        size="md"
        align="end"
        placement="top"
        buttonClassName="h-[54px] shadow-[0_14px_34px_rgb(26_143_60/0.35)]"
      />
    </div>
  );
}
