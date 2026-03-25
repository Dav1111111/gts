/**
 * GTS Logo — SVG-based from Figma design
 * "GTS" large letters + "Grand Tour Sochi" subtitle
 */
import svgPaths from "../imports/svg-jav4lrczhv";

interface GTSLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GTSLogo({ size = "md", className = "" }: GTSLogoProps) {
  // Exact aspect ratios from SVG viewBoxes
  // GTS: 1285.33 / 333.133 = 3.858
  // Subtitle: 1261.99 / 65.2792 = 19.33
  const sizes = {
    sm: { width: 80 },
    md: { width: 140 },
    lg: { width: 240 },
  };

  const w = sizes[size].width;
  const gtsHeight = Math.round(w / 3.858);
  const subtitleHeight = Math.round(w / 19.33);
  const gap = size === "sm" ? 1 : size === "md" ? 2 : 3;

  return (
    <div className={`inline-flex flex-col select-none ${className}`} style={{ gap, width: w }}>
      {/* GTS - main letters */}
      <svg
        width={w}
        height={gtsHeight}
        viewBox="0 0 1285.33 333.133"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* G - red */}
        <path d={svgPaths.p358fb820} fill="#BE0607" />
        {/* T - red */}
        <path d={svgPaths.p29914e30} fill="#BE0607" />
        {/* S - white */}
        <path d={svgPaths.p4621680} fill="white" />
      </svg>
      {/* Grand Tour Sochi - subtitle */}
      <svg
        width={w}
        height={subtitleHeight}
        viewBox="0 0 1261.99 65.2792"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* "Grand" - white */}
        <path d={svgPaths.p1c6c5980} fill="white" />
        <path d={svgPaths.p1ef2f900} fill="white" />
        <path d={svgPaths.pa460700} fill="white" />
        <path d={svgPaths.p61cc900} fill="white" />
        <path d={svgPaths.p13676000} fill="white" />
        {/* "Tour" - white */}
        <path d={svgPaths.p19bdff40} fill="white" />
        <path d={svgPaths.p3b93c530} fill="white" />
        <path d={svgPaths.p24259a0} fill="white" />
        <path d={svgPaths.pb5e1180} fill="white" />
        {/* "Sochi" - red */}
        <path d={svgPaths.p36467cc0} fill="#BE0607" />
        <path d={svgPaths.pab0e7c0} fill="#BE0607" />
        <path d={svgPaths.p103e2500} fill="#BE0607" />
        <path d={svgPaths.pf614400} fill="#BE0607" />
        <path d={svgPaths.p26f98980} fill="#BE0607" />
      </svg>
    </div>
  );
}