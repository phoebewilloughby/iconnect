export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="11" fill="#6A2B7E" />
        <circle cx="11" cy="10" r="5" fill="white" fillOpacity="0.95" />
        <circle cx="11" cy="10" r="1.5" fill="#6A2B7E" />
        <path d="M8 17 Q11 14 14 17" stroke="#6A2B7E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-ink-900">
        i<span className="text-purple-700">Connect</span>
      </span>
    </div>
  );
}
