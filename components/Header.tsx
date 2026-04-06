"use client"
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () =>{
  return (
    <header className="fixed right-4 sm:right-6 lg:right-10 top-7.5 w-fit flex justify-end items-center h-fit z-40">
      <button className="py-2 px-2.5 sm:py-3 sm:px-4 flex justify-center items-center gap-3 rounded-md bg-black/50 backdrop-blur-sm cursor-pointer">
        <p className="text-bodyBase tracking-subHeading text-[#ffffff] leading-[124%]">
          Menu
        </p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_138_48"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_138_48)">
            <path
              d="M3.5 7V5.5H20.5V7H3.5ZM3.5 18.5V17H20.5V18.5H3.5ZM3.5 12.75V11.25H20.5V12.75H3.5Z"
              fill="white"
            />
          </g>
        </svg>
      </button>
    </header>
  );
}

export default Header;