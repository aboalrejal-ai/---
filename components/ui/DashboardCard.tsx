import React from 'react';
import { DashboardCardProps } from '../../types';
import { cn } from '../../utils/helpers';

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className = '',
}) => {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 font-adir">
          {title}
        </h3>
        {icon && (
          <div className="text-brand-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;