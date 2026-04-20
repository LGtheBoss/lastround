type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--theme-text-muted)] ${className}`.trim()}
    >
      {children}
    </p>
  );
}
