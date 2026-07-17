interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p className={`font-mono text-2xs uppercase tracking-widest text-section ${className}`}>
      {children}
    </p>
  )
}
