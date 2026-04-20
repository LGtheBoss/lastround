import type { FloatingFeedbackTone } from "./FloatingFeedbackProvider";

type FloatingFeedbackItem = {
  id: number;
  label: string;
  tone: FloatingFeedbackTone;
  x: number;
  y: number;
  delayMs: number;
};

type FloatingFeedbackLayerProps = {
  items: FloatingFeedbackItem[];
};

export default function FloatingFeedbackLayer({
  items,
}: FloatingFeedbackLayerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {items.map((item) => (
        <div
          key={item.id}
          className={`floating-feedback floating-feedback-${item.tone} fixed rounded-full border px-3 py-1.5 text-[13px] font-semibold`}
          style={{
            left: item.x,
            top: item.y,
            animationDelay: `${item.delayMs}ms`,
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
