import type { CSSProperties, ReactNode } from "react";

export type ActionIconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export const ACTION_ICON_STROKE = 1.2;

const SVG_BASE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const GAMBLE_VIEWBOX = 64;
const GAMBLE_REEL_WINDOWS = [
  { x: 13.3, top: 29.7, width: 8.4, height: 12.6 },
  { x: 24.8, top: 29.7, width: 8.4, height: 12.6 },
  { x: 36.3, top: 29.7, width: 8.4, height: 12.6 },
];

type IconCanvasProps = {
  children: ReactNode;
  className?: string;
  size?: number;
};

type SvgLayerProps = {
  children: ReactNode;
  className?: string;
  strokeWidth?: number;
  viewBox?: string;
};

type SvgIconProps = SvgLayerProps & {
  size?: number;
};

function IconCanvas({
  children,
  className = "h-7 w-7",
  size,
}: IconCanvasProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <span
      aria-hidden="true"
      className={`${className} relative inline-flex shrink-0 select-none`}
      style={style}
    >
      {children}
    </span>
  );
}

function SvgLayer({
  children,
  className,
  strokeWidth = ACTION_ICON_STROKE,
  viewBox = "0 0 64 64",
}: SvgLayerProps) {
  return (
    <svg
      viewBox={viewBox}
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...SVG_BASE_PROPS}
    >
      {children}
    </svg>
  );
}

function SvgIcon({
  children,
  className = "h-7 w-7",
  size,
  strokeWidth = ACTION_ICON_STROKE,
  viewBox = "0 0 64 64",
}: SvgIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox={viewBox}
      className={`${className} shrink-0 select-none`}
      style={style}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...SVG_BASE_PROPS}
    >
      {children}
    </svg>
  );
}

function SlotDigitSeven() {
  return (
    <svg
      viewBox="0 0 16 28"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      {...SVG_BASE_PROPS}
      strokeWidth={1.7}
    >
      <path d="M2.9 5.2h10c-.07 1.52-.8 2.7-2.3 3.95l-3 2.76V23" />
      <path d="M2.8 6.4c.42-.86 1.12-1.26 2.12-1.2" />
    </svg>
  );
}

function ReelStrip({ reelIndex }: { reelIndex: number }) {
  return (
    <span className={`gamble-reel-strip gamble-reel-strip-${reelIndex}`}>
      <span className="gamble-reel-copy">
        <SlotDigitSeven />
      </span>
      <span className="gamble-reel-copy">
        <SlotDigitSeven />
      </span>
      <span className="gamble-reel-copy">
        <SlotDigitSeven />
      </span>
    </span>
  );
}

function SmokePuffs() {
  return (
    <>
      <path d="M50.2 34.05c1.62-1.88 1.93-3.62.92-5.25" />
      <path d="M53.85 33.4c1.82-2.22 2.15-4.34.95-6.35" />
    </>
  );
}

export function BeerBottleIcon({
  className,
  size,
  strokeWidth = ACTION_ICON_STROKE,
}: ActionIconProps) {
  return (
    <SvgIcon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    >
      <ellipse cx="32" cy="7.3" rx="4.25" ry="0.92" />
      <path d="M27.75 8.35h8.5" />
      <path d="M27.95 10.35c.62.58 1.22.86 1.8.86.55 0 1.08-.25 1.6-.75.66-.62 1.3-.62 1.9 0 .53.5 1.08.75 1.65.75.55 0 1.15-.3 1.8-.9.58-.55 1.16-.55 1.74 0" />
      <path d="M28.6 11.1v4.9c0 1.48-.38 2.8-1.14 3.96l-2.12 3.18c-1.46 2.18-2.2 4.5-2.2 6.96v19.68c0 4.03 1.95 6.05 5.86 6.05h6c3.91 0 5.86-2.02 5.86-6.05V30.09c0-2.46-.74-4.78-2.2-6.96l-2.12-3.18c-.76-1.16-1.14-2.48-1.14-3.96v-4.9" />
      <path d="M26.15 16.05h11.7" />
      <path
        d="M26.55 18.8c1.58-.8 3.4-1.2 5.45-1.2 2.05 0 3.87.4 5.45 1.2"
        className="beer-liquid"
      />
      <path d="M28.65 15.2v2.7" />
      <circle cx="36.15" cy="16.45" r="0.36" />
      <path d="M24.7 23.85c-.75 1-1.12 2.25-1.12 3.75v4.45" />
      <path d="M23.6 30.65h4.75c.9-2.1 2.45-3.15 4.65-3.15 2.2 0 3.75 1.05 4.65 3.15h2.75" />
      <path d="M23.6 45.15h4.75c.9 2.1 2.45 3.15 4.65 3.15 2.2 0 3.75-1.05 4.65-3.15h2.75" />
      <path d="M23.6 30.65v14.5" />
      <path d="M40.4 30.65v14.5" />
      <ellipse cx="32" cy="37.9" rx="5.65" ry="7.3" />
      <path d="M24.45 46.75v4.35" />
      <path d="M24.45 51.1c1.1.65 2.35.98 3.75.98h8.9c1.48 0 2.48-.58 2.98-1.75" />
      <path d="M26.65 53.2c1.45.45 3.23.67 5.35.67 2.12 0 3.9-.22 5.35-.67" />
    </SvgIcon>
  );
}

export function ShotGlassIcon({
  className,
  size,
  strokeWidth = ACTION_ICON_STROKE,
}: ActionIconProps) {
  return (
    <SvgIcon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
    >
      <ellipse cx="32" cy="11.2" rx="15.4" ry="2.85" />
      <path d="M16.95 11.25c.4 1.08.63 2.26.7 3.55l1.1 23.75c.22 4.78 2.55 7.18 6.98 7.18h12.54c4.43 0 6.76-2.4 6.98-7.18l1.1-23.75c.07-1.29.3-2.47.7-3.55" />
      <path
        d="M20.85 18.55c3.78 1.02 7.5 1.53 11.15 1.53s7.37-.51 11.15-1.53"
        className="shot-liquid"
      />
      <path d="M21.2 14.85v4.2" />
      <ellipse cx="29.25" cy="19.1" rx="0.78" ry="0.44" />
      <ellipse cx="32" cy="19.1" rx="0.78" ry="0.44" />
      <ellipse cx="34.75" cy="19.1" rx="0.78" ry="0.44" />
      <path d="M24.7 22.4v12.25c0 2.95 1.56 4.9 4.7 5.85" />
      <circle cx="41.6" cy="25.55" r="0.4" />
      <circle cx="39.45" cy="27.95" r="0.4" />
      <circle cx="41.85" cy="30.25" r="0.4" />
      <circle cx="38.6" cy="31.95" r="0.4" />
      <circle cx="40.75" cy="34.55" r="0.4" />
      <circle cx="37.95" cy="36.45" r="0.4" />
      <path d="M24.9 45.95v1.95" />
      <path d="M39.15 45.95v1.95" />
      <path d="M27.55 48.3c1.42.3 2.9.45 4.45.45 1.55 0 3.03-.15 4.45-.45" />
    </SvgIcon>
  );
}

export function SlotMachineIcon({
  className,
  size,
  strokeWidth = ACTION_ICON_STROKE,
}: ActionIconProps) {
  return (
    <IconCanvas className={className} size={size}>
      {GAMBLE_REEL_WINDOWS.map((reel, index) => {
        const style: CSSProperties = {
          left: `${(reel.x / GAMBLE_VIEWBOX) * 100}%`,
          top: `${(reel.top / GAMBLE_VIEWBOX) * 100}%`,
          width: `${(reel.width / GAMBLE_VIEWBOX) * 100}%`,
          height: `${(reel.height / GAMBLE_VIEWBOX) * 100}%`,
        };

        return (
          <span
            key={`${reel.x}-${reel.top}`}
            className="gamble-reel-window"
            style={style}
          >
            <ReelStrip reelIndex={index + 1} />
          </span>
        );
      })}

      <SvgLayer
        className="gamble-frame-layer"
        strokeWidth={strokeWidth}
      >
        <rect x="6.2" y="24.4" width="40.8" height="19.1" rx="4.1" />
        <rect x="8.85" y="27" width="35.5" height="13.9" rx="2.85" />
        <rect x="13.15" y="29.45" width="7.35" height="8.75" rx="1.05" />
        <rect x="22.65" y="29.45" width="7.35" height="8.75" rx="1.05" />
        <rect x="32.15" y="29.45" width="7.35" height="8.75" rx="1.05" />
      </SvgLayer>

      <SvgLayer
        className="gamble-lever-layer"
        strokeWidth={strokeWidth}
      >
        <path d="M50.15 25.1v13.7" />
        <circle cx="50.15" cy="20.1" r="2.35" />
        <path d="M47.85 37.8c1.95.2 3.55 1.25 4.6 3.1" />
        <path d="M50.15 40.55c-1.28-.12-2.08-.82-2.4-2.1" />
        <circle cx="50.15" cy="40.55" r="2.3" />
      </SvgLayer>
    </IconCanvas>
  );
}

export function CigaretteIcon({
  className,
  size,
  strokeWidth = ACTION_ICON_STROKE,
}: ActionIconProps) {
  return (
    <IconCanvas className={className} size={size}>
      <SvgLayer
        className="smoke-body-layer"
        strokeWidth={strokeWidth}
      >
        <g transform="rotate(-8 32 40)">
          <ellipse cx="16.55" cy="40.45" rx="1.95" ry="2.55" />
          <ellipse cx="47.8" cy="40.35" rx="1.78" ry="2.32" />
          <path d="M16.55 37.9h31.25" />
          <path d="M16.55 42.95h31.25" />
          <path d="M21.25 38.25v4.35" />
          <path d="M22.1 39.35h22.6" />
          <circle cx="18.15" cy="39.25" r="0.25" />
          <circle cx="19.55" cy="39.75" r="0.25" />
          <circle cx="18.85" cy="40.95" r="0.25" />
          <circle cx="20.15" cy="41.3" r="0.25" />
          <circle cx="17.45" cy="40.25" r="0.25" />
          <circle cx="19.25" cy="40.5" r="0.25" />
        </g>
      </SvgLayer>

      <SvgLayer
        className="smoke-puff-static"
        strokeWidth={strokeWidth}
      >
        <SmokePuffs />
      </SvgLayer>

      <SvgLayer
        className="smoke-puff-track smoke-puff-track-1"
        strokeWidth={strokeWidth}
      >
        <SmokePuffs />
      </SvgLayer>

      <SvgLayer
        className="smoke-puff-track smoke-puff-track-2"
        strokeWidth={strokeWidth}
      >
        <SmokePuffs />
      </SvgLayer>
    </IconCanvas>
  );
}

export const BeerIcon = BeerBottleIcon;
export const ShotIcon = ShotGlassIcon;
export const GambleIcon = SlotMachineIcon;
export const SmokeIcon = CigaretteIcon;
