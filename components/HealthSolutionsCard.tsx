"use client";
import React, { useRef, useState, useEffect } from 'react';
import FadeUp from '@/components/FadeUp';
import CardItemDesktop from './CardItemDesktop';
import CardItemMedium from './CardItemMedium';

export interface CarouselItem {
  title: string;
  text?: string;
  imgSrc: string;
  href?: string;
}

interface HealthSolutionsCardProps {
  items?: CarouselItem[];
  cardsColor?: string;
}

const HealthSolutionsCard: React.FC<HealthSolutionsCardProps> = ({ items = [], cardsColor }) =>  {
  const displayItems = items;
  const isFixedGrid = displayItems.length === 4;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const { scrollLeft, clientWidth } = container;
      const cards = (Array.from(container.children) as HTMLElement[]).filter(c => c.offsetParent !== null);

      setCanScrollLeft(scrollLeft > 5); // 5px tolerance for partial scroll

      if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        const lastCardRightEdge = lastCard.offsetLeft + lastCard.offsetWidth;
        setShowButtons(lastCardRightEdge > clientWidth + 5);
        setCanScrollRight(lastCardRightEdge > scrollLeft + clientWidth + 5);
      } else {
        setCanScrollLeft(false);
        setCanScrollRight(false);
        setShowButtons(false);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    // Initial check might need a tiny timeout to ensure styles applied
    setTimeout(checkScroll, 100);
    return () => window.removeEventListener('resize', checkScroll);
  }, [displayItems]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const container = scrollRef.current;
      const currentScroll = container.scrollLeft;

      const cards = (Array.from(container.children) as HTMLElement[]).filter(c => c.offsetParent !== null);
      const paddingLeft = cards.length > 0 ? cards[0].offsetLeft : 0;

      let newScrollPosition = currentScroll;

      if (direction === 'right') {
        const nextCard = cards.find(card => card.offsetLeft - paddingLeft > currentScroll + 5);
        if (nextCard) {
          newScrollPosition = nextCard.offsetLeft - paddingLeft;
        }
      } else {
        const prevCard = cards.slice().reverse().find(card => card.offsetLeft - paddingLeft < currentScroll - 5);
        if (prevCard) {
          newScrollPosition = prevCard.offsetLeft - paddingLeft;
        }
      }

      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FadeUp className="col-span-4 sm:col-span-12 flex flex-col gap-y-7.5 lg:gap-y-10">
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={`justify-start items-stretch whitespace-nowrap min-w-full overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-10 gap-x-4 md:gap-x-5 lg:gap-x-7.5 snap-mandatory relative scroll-smooth ${isFixedGrid ? "flex @6xl:grid @6xl:grid-cols-4" : "flex"}`}

      // [@media(min-width:1920px)]:flex
      >
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            <CardItemDesktop item={item} index={index} isFixedGrid={isFixedGrid} cardsColor={cardsColor} />
            <CardItemMedium item={item} index={index} isFixedGrid={isFixedGrid} cardsColor={cardsColor} />
          </React.Fragment>
        ))}
      </div>

      {showButtons && (
        <div className='w-fit mx-auto h-fit flex justify-center items-center gap-x-4.5 md:gap-x-5 lg:gap-x-7.5'>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center p-4 2xl:p-5 bg-[#d9d9d9]/50 aspect-square rounded-full transition-opacity ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
          >
            <img src="/icons/arrow_next.svg" alt="Previous Cards" className='object-contain object-center h-4 2xl:h-5 w-4 2xl:w-5 -scale-x-100' />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex items-center justify-center p-4 2xl:p-5 bg-[#d9d9d9]/50 aspect-square rounded-full transition-opacity ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
          >
            <img src="/icons/arrow_next.svg" alt="Next Cards" className='object-contain object-center h-4 2xl:h-5 w-4 2xl:w-5' />
          </button>
        </div>
      )}
    </FadeUp>
  );
}

export default HealthSolutionsCard;