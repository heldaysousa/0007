import React from 'react';
    import { LogoProps } from './types';
    import logo from '../../../assets/images/logo.png';
    import logoSmall from '../../../assets/images/logo-small.png';

    export function Logo({ className = '', size = 'lg' }: LogoProps) {
      return (
        <img
          src={size === 'lg' ? logo : logoSmall}
          alt="CEO Express Logo"
          className={`h-auto ${size === 'lg' ? 'w-48' : 'w-24'} ${className}`}
          style={{ filter: 'var(--logo-filter)' }}
        />
      );
    }
