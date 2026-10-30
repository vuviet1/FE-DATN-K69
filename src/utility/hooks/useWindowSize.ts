/**
 * @file useWindowSize.ts
 * @description Hook theo dõi kích thước cửa sổ trình duyệt (responsive)
 */

import type { IWindowSize } from '@domain/models';
import { useEffect, useState } from 'react';

export const useWindowSize = (): IWindowSize => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
