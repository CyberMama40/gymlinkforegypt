type LogoProps = {
  variant?: "icon" | "lockup";
  className?: string;
};

export function Logo({ variant = "lockup", className }: LogoProps) {
  const rings = (
    <g strokeWidth={22} strokeLinecap="round" fill="none">
      <path d="M50 12 a48 48 0 1 0 48 48" stroke="#CCFF00" />
      <path d="M104 108 a48 48 0 1 0 -48 -48" stroke="#FFFFFF" />
    </g>
  );

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 154 154"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="GymLink"
        className={className}
      >
        <g transform="translate(2 2)">{rings}</g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GymLink"
      className={className}
    >
      <g transform="translate(2 18)">{rings}</g>
      <text
        x="150"
        y="108"
        fontFamily="Sora, sans-serif"
        fontSize="72"
        fontWeight="700"
        letterSpacing="-2"
      >
        <tspan fill="#FFFFFF">Gym</tspan>
        <tspan fill="#CCFF00">Link</tspan>
      </text>
    </svg>
  );
}
