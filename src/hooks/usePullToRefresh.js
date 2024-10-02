import { useEffect } from 'react';

const usePullToRefresh = (onRefresh) => {
  useEffect(() => {
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isPulling = false;

    const threshold = 70; // Pixels to trigger refresh

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling) return;
      touchCurrentY = e.touches[0].clientY;
      if (touchCurrentY - touchStartY > threshold) {
        onRefresh();
        isPulling = false;
      }
    };

    const handleTouchEnd = () => {
      isPulling = false;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh]);
};

export default usePullToRefresh;