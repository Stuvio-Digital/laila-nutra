"use client";
import React from 'react';
import Link from 'next/link';

interface CTAProps {
  ctaContent: string;
  href?: string;
  target?: string;
  className?: string;
  as?: 'link' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const CTA: React.FC<CTAProps> = ({
  ctaContent,
  href,
  target,
  className = '',
  as = 'link',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const commonClasses = `text-body tracking-[-1%] text-normal text-white px-4 md:px-4.5 lg:px-5.5 py-2.5 md:py-3 w-fit rounded-full bg-blue text-center flex justify-center items-center ${className}`;

  if (as === 'button') {
    return (
      <button
        type={type}
        className={commonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {ctaContent}
      </button>
    );
  }

  return (
    <Link
      href={href || '#'}
      className={commonClasses}
      target={target}
      onClick={onClick}
    >
      {ctaContent}
    </Link>
  );
}

export default CTA;