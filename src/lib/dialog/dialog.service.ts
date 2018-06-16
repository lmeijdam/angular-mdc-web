import {
  ComponentRef,
  Injectable,
  OnDestroy
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MdcPortalService } from '@angular-mdc/web/common';

import { MdcDialogRef } from './dialog-ref';
import { MdcDialogComponent } from './dialog.component';
import { MdcDialogConfig } from './dialog-config';

/** Interface that can be used to generically type a class. */
export interface ComponentType<T> {
  new(...args: any[]): T;
}

@Injectable()
export class MdcDialog implements OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _openedDialogRef: MdcDialogRef<any> | null = null;

  /** Subscription to dialog. */
  private _dialogSubscription: Subscription | null;

  constructor(private _portalService: MdcPortalService) { }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this.dismiss();
  }

  /**
   * Opens a dialog containing the given component.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T>(component: ComponentType<T>, config?: MdcDialogConfig): MdcDialogRef<any> {
    if (this.isShowing()) {
      this.dismiss();
    }

    this._openedDialogRef
      = new MdcDialogRef<any>(this._portalService.createComponentRef(component).instance);

    // this._openedDialogRef.componentInstance.data = { message, actionText };
    this._openedDialogRef.componentInstance.config = _applyConfigDefaults(config);

    this._dialogSubscription = this._openedDialogRef.componentInstance.closed
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.dismiss();
      });

    this._openedDialogRef.open();

    return this._openedDialogRef;
  }

  isShowing(): boolean {
    return !!this._openedDialogRef;
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  dismiss(): void {
    if (this._openedDialogRef) {
      this._openedDialogRef.close();
      this._portalService.dispose();
      this._openedDialogRef = null;
    }
  }
}

/**
 * Applies default options to the dialog config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config?: MdcDialogConfig): MdcDialogConfig {
  return { ...new MdcDialogConfig(), ...config };
}
