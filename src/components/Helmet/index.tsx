/**
 * @file index.tsx
 * @description Lightweight Helmet component thiết lập document.title tương thích mọi môi trường
 */

import React, { useEffect } from 'react';

export interface IHelmetProps {
  children?: React.ReactNode;
  title?: string;
}

export const Helmet: React.FC<IHelmetProps> = ({ children, title }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - Cổng Quản lý Sinh viên`;
    } else if (children) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === 'title') {
          const titleText = (child.props as any).children;
          if (titleText) {
            document.title = `${titleText} - Cổng Quản lý Sinh viên`;
          }
        }
      });
    }
  }, [children, title]);

  return null;
};

export default Helmet;
