"use client";
import React from 'react';
import Link from 'next/link';

interface ActionLinkProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  altText?: string;
  target?: string;
  rel?: string;
}

const ActionLink: React.FC<ActionLinkProps> = ({
  text = "Know More",
  href,
  onClick,
  className = "",
  altText,
  target,
  rel
}) => {
  const commonClasses = `w-fit h-fit flex justify-center items-center gap-1 text-blue transition-opacity hover:opacity-80 cursor-pointer ${className}`;
  const imageAlt = altText || `${text} link arrow`;

  const content = (
    <>
      <p className="text-body font-normal leading-[90%]">
        {text}
      </p>
      <img
        src="/icons/arrow_outward.svg"
        alt={imageAlt}
        className="w-4 h-4 md:h-4.5 md:w-4.5"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={commonClasses} target={target} rel={target === "_blank" ? "noopener noreferrer" : rel}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {content}
    </button>
  );
};

export default ActionLink;