interface ContainerProps {
  children: React.ReactNode
  variant?: 'content' | 'prose' | 'wide'
  className?: string
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`max-w-content mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}
