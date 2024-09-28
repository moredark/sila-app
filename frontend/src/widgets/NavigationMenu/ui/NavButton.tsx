import clsx from 'clsx'

type NavButtonProps = {
  icon: JSX.Element
  label: string
  onClick: () => void
  isMain?: boolean
  isActive?: boolean
}

export const NavButton = ({
  icon,
  label,
  onClick,
  isMain,
  isActive,
}: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex h-16 w-full flex-col items-center justify-center transition-colors',
        isMain
          ? 'scale-105 rounded bg-primary text-primary-foreground shadow-lg'
          : isActive
            ? 'text-primary dark:text-primary-foreground'
            : 'text-muted-foreground dark:text-neutral-400'
      )}
      aria-label={label}
      style={{ flexBasis: '33.33%' }}
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </button>
  )
}
