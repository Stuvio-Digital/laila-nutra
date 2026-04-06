"use client";
import React from 'react';
import Link from 'next/link';

interface bannerProps {
  imgSrc: string;
  title: string;
  subCopy?: string;
}

const Banner: React.FC<bannerProps> = ({ imgSrc, title, subCopy }) => {
  return (
    <section className="@container h-dvh w-full relative overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="h-full w-full object-cover object-center"
      />
      <div className='absolute z-10 bg-black/10 inset-0 w-full h-full' />
      <div className="absolute w-full h-full z-20 inset-0 px-4 md:px-6 lg:px-10 py-10 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-5 place-content-end items-end auto-rows-min md:auto-rows-auto">
        <h1 className="col-span-4 @4xl:col-span-2 text-heading1 leading-[110%] tracking-[-2%] lg:tracking-[-4%] text-white font-medium">
          {title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        {subCopy &&
          <p
            className={`lg:pe-10 col-span-4 @4xl:col-span-2 max-w-[90%]  xl:max-w-142 2xl:max-w-[80%] text-bodyBase [@media(min-width:1920px)]:text-subHeading2 text-wrap font-light leading-[124%] tracking-[-2%] text-white`}
          >
            {subCopy}
          </p>
        }
      </div>
      <Link
        href="/"
        className="aspect-84/40 sm:aspect-104/60 max-w-26 absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-30 top-6"
      >
        <img
          src="/images/common/laila-logo-color.png"
          alt="Laila Nutra Logo"
          className="w-auto h-full sm:mx-auto"
        />
      </Link>
    </section>
  );
}

export default Banner