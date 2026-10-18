/** Decorative block shown until a real photo is added in content.ts. */
export default function Placeholder({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex size-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#EEF5EF_0%,#E9ECE7_70%)] p-6 text-center text-brand"
    >
      <span className="text-sm font-medium text-body">{label}</span>
    </div>
  );
}
