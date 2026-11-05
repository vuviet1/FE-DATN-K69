import {
  App,
  message as staticMessage,
  notification as staticNotification,
} from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type React from 'react';

let messageInstance: MessageInstance | null = null;
let notificationInstance: NotificationInstance | null = null;

export const AntdAppBridge: React.FC = () => {
  const staticFunction = App.useApp();
  messageInstance = staticFunction.message;
  notificationInstance = staticFunction.notification;
  return null;
};

export const message = {
  success: (...args: Parameters<MessageInstance['success']>) =>
    (messageInstance || staticMessage).success(...args),
  error: (...args: Parameters<MessageInstance['error']>) =>
    (messageInstance || staticMessage).error(...args),
  warning: (...args: Parameters<MessageInstance['warning']>) =>
    (messageInstance || staticMessage).warning(...args),
  info: (...args: Parameters<MessageInstance['info']>) =>
    (messageInstance || staticMessage).info(...args),
  loading: (...args: Parameters<MessageInstance['loading']>) =>
    (messageInstance || staticMessage).loading(...args),
  open: (...args: Parameters<MessageInstance['open']>) =>
    (messageInstance || staticMessage).open(...args),
};

export const notification = {
  open: (...args: Parameters<NotificationInstance['open']>) =>
    (notificationInstance || staticNotification).open(...args),
  success: (...args: Parameters<NotificationInstance['success']>) =>
    (notificationInstance || staticNotification).success(...args),
  error: (...args: Parameters<NotificationInstance['error']>) =>
    (notificationInstance || staticNotification).error(...args),
  warning: (...args: Parameters<NotificationInstance['warning']>) =>
    (notificationInstance || staticNotification).warning(...args),
  info: (...args: Parameters<NotificationInstance['info']>) =>
    (notificationInstance || staticNotification).info(...args),
};
