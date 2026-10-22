interface CodeBlockProps {
  children: string
  label: string
  /** "fence" marks untrusted text with the yellow outline; "console" is for command output. */
  variant?: 'plain' | 'fence' | 'console'
}

/**
 * Preformatted text that can scroll sideways. Scrollable regions must be reachable by keyboard,
 * so this is the single place that makes a <pre> focusable.
 */
export function CodeBlock({ children, label, variant = 'plain' }: CodeBlockProps) {
  const className = variant === 'plain' ? 'code' : `code code--${variant}`
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <pre className={className} tabIndex={0} aria-label={label}>
      {children}
    </pre>
  )
}
