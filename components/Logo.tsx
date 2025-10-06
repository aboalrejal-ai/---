import React from 'react';
import { useLogo } from '../contexts/LogoProvider';
import { cn } from '../utils/helpers';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const { logoType } = useLogo();

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">ن</span>
      </div>
      
      {logoType === 'landing' ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-primary font-adir">
            منصة النشاط الطلابي
          </h1>
          <p className="text-sm text-gray-600">
            إدارة شاملة للأنشطة التعليمية
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-white font-adir">
            النشاط الطلابي
          </h2>
          <p className="text-sm text-gray-300">
            منصة إدارية متكاملة
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;