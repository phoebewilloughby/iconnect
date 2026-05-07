export default function FinSparkle({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <circle cx="8" cy="8" r="8" fill="#6A2B7E" />
      <path
        d="M8 3.5L9.1 6.9L12.5 8L9.1 9.1L8 12.5L6.9 9.1L3.5 8L6.9 6.9L8 3.5Z"
        fill="white"
        strokeWidth="0.3"
        stroke="white"
        strokeLinejoin="round"
      />
    </svg>
  );
}
