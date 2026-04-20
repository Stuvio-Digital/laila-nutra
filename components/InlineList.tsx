"use client";
import React from 'react';
import ActionLink from './ActionLink';
import FadeUp from './FadeUp';

interface inlineListProps {
  imgSrc: string;
  title: string;
  text?: string
  inlineListStructure?: string;
  inlineListDetailsStructure?: string;
  inlineListImgStructure?: string;
  listLink?: string
  listLinkContent?: string
}

const InlineList: React.FC<inlineListProps> = ({ imgSrc, title, text, inlineListStructure, inlineListDetailsStructure, inlineListImgStructure, listLink, listLinkContent }) => {
  return (
    <FadeUp as='li' className={`${inlineListStructure ? inlineListStructure : "col-span-2"} py-5 md:py-6 border-t border-t-[#ebebeb] flex flex-col justify-between items-stretch gap-y-7.5`}>
      <div className={`grid @6xl:flex grid-cols-4 sm:grid-cols-12 lg:grid-cols-6 items-center gap-y-6`}>
        <div className={`${inlineListImgStructure} w-full @6xl:w-[25%] @6xl:max-w-37.5 2xl:min-w-45 mx-auto @6xl:mx-0 relative aspect-square rounded-full overflow-hidden shrink-0`}>
          <img src={imgSrc} alt={title} className='h-full w-full absolute inset-0 object-cover' />
        </div>
        <div className={`${inlineListDetailsStructure} w-full flex flex-col gap-y-2 md:gap-y-3`}>
          <p className='max-w-[90%] xl:max-w-[80%] text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] font-medium text-black tracking-[-2%]'>{title}</p>
          <p className='max-w-[90%] xl:max-w-[80%] text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] font-normal text-textSecondary tracking-[-1%]'>{text}</p>
          {(listLinkContent || listLink) && <ActionLink className='hidden @4xl:flex mt-4' href={listLink} text={listLinkContent} />}
        </div>
      </div>
      {(listLinkContent || listLink) && <ActionLink className='flex @4xl:hidden md:ml-39 @4xl:ml-0' href={listLink} text={listLinkContent} />}
    </FadeUp>
  )
}

export default InlineList