const P = {
  box: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
  chart: <path d="M5 20V11M12 20V4M19 20v-6" />,
  bag: <><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M6 17v-6a6 6 0 1 1 12 0v6l1.5 2h-15z" /><path d="M10 21h4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16z" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  out: <path d="M8 16 16 8M9 8h7v7" />,
}

export default function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name]}
    </svg>
  )
}
