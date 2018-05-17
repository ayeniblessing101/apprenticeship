import { NotificationTypes } from 'app/enums/notification-types.enum';

/**
 * @interface Notice
 * Blueprint for the notification message
 */
interface Notice {
  title: string;
  content: string;
}

/**
 * @interface Message
 * Blueprint for the notification object
 */
export interface Message {
  type: NotificationTypes;
  message: Notice;
  sender: string;
  messageUrl?: string;
  timestamp: number;
}
