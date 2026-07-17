interface SectionWrapperProps {
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
  as?: 'section' | 'div' | 'article'
}

export default function SectionWrapper({
  children,
  spacing = 'md',
  className = '',
  as: Tag = 'section',
}: SectionWrapperProps) {
  const py = {
    sm: 'py-space-7',
    md: 'py-space-9',
    lg: 'py-space-12',
  }[spacing]

  return (
    <Tag className={`${py} ${className}`}>
      {children}
    </Tag>
  )
}
