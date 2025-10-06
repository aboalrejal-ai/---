import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outline'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  variant = 'default',
  className,
  ...props
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'

  const variantClasses = {
    default: 'border border-gray-300 rounded-lg bg-white hover:border-gray-400',
    filled: 'border-0 rounded-lg bg-gray-50 hover:bg-gray-100',
    outline: 'border-2 border-gray-300 rounded-lg bg-transparent hover:border-brand-primary'
  }

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    error && 'border-red-500 focus:ring-red-500',
    className
  )

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={clsx(
            classes,
            icon && 'pr-10'
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'