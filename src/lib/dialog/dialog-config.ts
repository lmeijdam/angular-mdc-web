import { ViewContainerRef } from '@angular/core';

import { ComponentType } from '@angular-mdc/web/common';
import { MdcDialogComponent } from './dialog.component';

/** Valid ARIA roles for a dialog element. */
export type DialogRole = 'dialog' | 'alertdialog';

export class MdcDialogConfig<D = any> {
  /** Component to use as the container for the dialog. */
  containerComponent?: ComponentType<MdcDialogComponent>;

  viewContainerRef?: ViewContainerRef;

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

  /** Whether the dialog has a background. */
  hasBackdrop?: boolean = true;

  /** Data to be injected into the dialog content. */
  data?: D | null = null;
}
