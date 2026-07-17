interface ContainerProps {
  children: React.ReactNode
  variant?: 'content' | 'prose' | 'wide'
  className?: string
}

export default function Container({
  children,
  variant = 'content',
  className = '',
}: ContainerProps) {
  const maxWidth = {
    content: 'max-w-content',
    prose:   'max-w-prose',
    wide:    'max-w-wide',
  }[variant]

  return (
    <div className={`${maxWidth} mx-auto px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}
