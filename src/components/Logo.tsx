import React from 'react'
import { useLogo } from '../contexts/LogoContext'
import { clsx } from 'clsx'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md'
}) => {
  const { logoType } = useLogo()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* أيقونة الشعار */}
      <div className={clsx(
        'bg-brand-primary text-white rounded-full flex items-center justify-center font-bold',
        sizeClasses[size]
      )}>
        <svg
          className={clsx('w-1/2 h-1/2', size === 'sm' && 'w-3 h-3')}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      {/* نص الشعار */}
      <div className="flex flex-col">
        <span className={clsx(
          'font-bold text-brand-primary',
          textSizeClasses[size]
        )}>
          نشاط طلابي
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-gray-600">
            منصة إدارة متكاملة
          </span>
        )}
      </div>
    </div>
  )
}