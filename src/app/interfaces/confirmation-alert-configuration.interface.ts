export interface ConfirmationAlertConfiguration {
  confirmActionText?: string;
  abortActionText?: string;
  confirmAction?: Function;
  canDisable?: boolean;
  afterClose?: Function;
};
