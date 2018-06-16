/** Valid ARIA roles for a dialog element. */
export type DialogRole = 'dialog' | 'alertdialog';

export class MdcDialogConfig {
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** The ARIA role of the dialog element. */
  role?: DialogRole = 'dialog';

  /** ID of the element that describes the dialog.  */
  ariaDescribedBy?: string | null = null;

  /** Aria label to assign to the dialog element */
  ariaLabel?: string | null = null;

  /** Whether the user can use escape key to close the dialog */
  escapeToClose?: boolean = true;

  /** Whether the user can click outside to close the dialog */
  clickOutsideToClose?: boolean = true;
}
