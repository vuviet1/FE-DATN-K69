/**
 * @file INotification.ts
 * @description Domain Model Thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import type { IFPagingApiParams } from './IPaging';

export type NotificationType = 'system' | 'academic' | 'urgent' | 'fee';
export type NotificationPriority = 'normal' | 'high' | 'urgent';
export type NotificationTargetType = 'all' | 'lecturers' | 'students' | 'class';
export type NotificationStatus =
  | 'draft'
  | 'published'
  | 'scheduled'
  | 'revoked';

export interface ISystemNotification {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  priority: NotificationPriority;
  targetType: NotificationTargetType;
  targetId?: string;
  targetName?: string;
  channels: ('web' | 'email')[];
  status: NotificationStatus;
  sendAt: string;
  createdAt: string;
  createdBy: string;
  readCount: number;
  totalTarget: number;
}

export interface INotificationQuery extends IFPagingApiParams {
  type?: NotificationType;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  targetType?: NotificationTargetType;
}

export interface INotificationSubmit {
  id?: string;
  title: string;
  content: string;
  type: NotificationType;
  priority: NotificationPriority;
  targetType: NotificationTargetType;
  targetId?: string;
  channels: ('web' | 'email')[];
  status?: NotificationStatus;
  sendAt?: string;
}
