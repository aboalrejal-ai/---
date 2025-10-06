import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined' | 'elevated'
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
  rounded = 'lg',
  variant = 'default',
  onClick
}) => {
  const baseClasses = 'bg-white transition-all duration-200'

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }

  const variantClasses = {
    default: '',
    outlined: 'border border-gray-200',
    elevated: 'shadow-lg border border-gray-100'
  }

  const classes = clsx(
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    variantClasses[variant],
    onClick && 'cursor-pointer hover:shadow-md',
    className
  )

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {children}
    </div>
  )
}