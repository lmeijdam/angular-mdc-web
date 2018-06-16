import { Observable, Subject } from 'rxjs';

import { MdcDialogComponent } from './dialog.component';

/**
 * Reference to a dialog dispatched from the MdcDialog service.
 */
export class MdcDialogRef<T, R = any> {
  /** The instance of the component making up the content of the dialog. */
  instance: T;
  componentInstance: MdcDialogComponent;

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  constructor(component: MdcDialogComponent) {
    this.componentInstance = component;
  }

  /** Subject for notifying the user that the dialog has finished opening. */
  private readonly _afterOpen = new Subject<void>();

  /** Subject for notifying the user that the dialog has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Gets an observable that is notified when the dialog is finished opening. */
  afterOpen(): Observable<void> {
    return this._afterOpen.asObservable();
  }

  /** Gets an observable that is notified when the dialog is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  open(): void {
    this.componentInstance.show();

    this._afterOpen.next();
    this._afterOpen.complete();
  }

  close(): void {
    this._afterClosed.next();
    this._afterClosed.complete();
  }
}
