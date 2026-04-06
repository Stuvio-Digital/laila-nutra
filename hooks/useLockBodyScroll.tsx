"use client"
import { useEffect, useCallback, useRef } from 'react';

interface ScrollData {
  isLocked: boolean;
  scrollTop: number;
  originalStyles: {
    overflow?: string;
    position?: string;
    top?: string;
    width?: string;
  };
}

const useLockBodyScroll = (isLocked: boolean, scrollableSelector: string = '.no-scrollbar') => {
  const scrollDataRef = useRef<ScrollData>({
    isLocked: false,
    scrollTop: 0,
    originalStyles: {}
  });

  const preventBodyScroll = useCallback(() => {
    if (scrollDataRef.current.isLocked) return;

    const body = document.body;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Store original styles and scroll position
    scrollDataRef.current = {
      isLocked: true,
      scrollTop,
      originalStyles: {
        overflow: body.style.overflow,
        position: body.style.position,
        top: body.style.top,
        width: body.style.width
      }
    };

    // Apply lock styles
    Object.assign(body.style, {
      overflow: 'hidden',
      position: 'fixed',
      top: `-${scrollTop}px`,
      width: '100%'
    });
  }, []);

  const restoreBodyScroll = useCallback(() => {
    if (!scrollDataRef.current.isLocked) return;

    const body = document.body;
    const { scrollTop, originalStyles } = scrollDataRef.current;

    // Restore original styles
    Object.assign(body.style, originalStyles);

    // Restore scroll position
    window.scrollTo(0, scrollTop);

    // Reset state
    scrollDataRef.current.isLocked = false;
  }, []);

  const touchMoveHandler = useCallback((e: TouchEvent) => {
    const target = e.target as HTMLElement;
    // Allow scrolling within specified scrollable content
    if (target.closest && target.closest(scrollableSelector)) {
      return;
    }
    if (e.cancelable) {
      e.preventDefault();
    }
  }, [scrollableSelector]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (isLocked) {
      timeoutId = setTimeout(() => {
        preventBodyScroll();
        // Add touch event listener for iOS
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      }, 0);
    } else {
      // Immediate cleanup when unlocking
      restoreBodyScroll();
      document.removeEventListener('touchmove', touchMoveHandler as any);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (isLocked) {
         // If unmounting while locked, restore scroll
         restoreBodyScroll();
         document.removeEventListener('touchmove', touchMoveHandler as any);
      }
    };
  }, [isLocked, touchMoveHandler, preventBodyScroll, restoreBodyScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      restoreBodyScroll();
      document.removeEventListener('touchmove', touchMoveHandler as any);
    };
  }, [restoreBodyScroll, touchMoveHandler]);
};

export default useLockBodyScroll;
export { useLockBodyScroll }; // Also adding named export for compatibility
