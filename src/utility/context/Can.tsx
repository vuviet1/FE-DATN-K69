/**
 * @file Can.tsx
 * @description Permission context wrapper theo chuẩn Mes-Client-ES
 */

import { useAccess } from '@umijs/max';
import React from 'react';

export interface ICanProps {
  action?: string;
  subject?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Can: React.FC<ICanProps> = ({ children, fallback = null }) => {
  const access = useAccess();
  // Mặc định cho phép hoặc kiểm tra dựa trên quyền
  const isAllowed = Boolean(access);
  return <>{isAllowed ? children : fallback}</>;
};

export default Can;
