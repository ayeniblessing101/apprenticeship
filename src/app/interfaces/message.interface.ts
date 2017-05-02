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
  type: string;
  message: Notice;
  sender: string;
  messageUrl: string;
  timestamp: number;
}
