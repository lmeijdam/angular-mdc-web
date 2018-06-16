import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isBrowser, EventRegistry, ESCAPE } from '@angular-mdc/web/common';

import {
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle
} from './dialog-directives';
import { MdcDialogConfig } from './dialog-config';
import { MdcDialogRef } from './dialog-ref';

import { MDCDialogAdapter } from './adapter';
import { MDCDialogFoundation, util } from '@material/dialog';

@Component({
  moduleId: module.id,
  selector: 'mdc-dialog',
  template: `
  <div #surface class="mdc-dialog__surface">
    <ng-content></ng-content>
  </div>
  <div class="mdc-dialog__backdrop" *ngIf="backdrop"></div>
  `,
  host: {
    '[attr.role]': '_config?.role',
    '[attr.aria-labelledby]': '_config?.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_config?.ariaLabel',
    '[attr.aria-describedby]': '_config?.ariaDescribedBy || null',
  },
  providers: [EventRegistry],
  encapsulation: ViewEncapsulation.None
})
export class MdcDialogComponent implements OnInit, OnDestroy {
  private _focusTrap: {
    activate: Function,
    deactivate: Function,
    pause(): void,
    unpause(): void
  };

  data: { message: string, actionText: string };
  config: MdcDialogConfig;

  /** ID of the element that should be considered as the dialog's label. */
  _ariaLabelledBy: string | null = null;

  @Input() clickOutsideToClose: boolean = true;
  @Input() escapeToClose: boolean = true;
  @Input() backdrop: boolean = true;

  @HostBinding('class.mdc-dialog') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';
  @HostBinding('tabindex') tabIndex: number = -1;

  /** Event emitted when the dialog is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the dialog is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  @Output('accept') _accept: EventEmitter<string> = new EventEmitter();
  @Output('cancel') _cancel: EventEmitter<string> = new EventEmitter();

  @ViewChild('surface') _surface: HTMLElement;
  @ContentChild(MdcDialogBody) _dialogBody: MdcDialogBody;
  @ContentChildren(MdcDialogButton, { descendants: true }) _actions: QueryList<MdcDialogButton>;

  private _mdcAdapter: MDCDialogAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    addBodyClass: (className: string) => {
      if (isBrowser()) {
        document.body.classList.add(className);
      }
    },
    removeBodyClass: (className: string) => {
      if (isBrowser()) {
        document.body.classList.remove(className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    registerInteractionHandler: (evt: string, handler: EventListener) => {
      const clickOutsideToClose = this.config ? this.config.clickOutsideToClose : this.clickOutsideToClose;

      handler = this._surface && clickOutsideToClose ? handler : (event) => {
        if ((<any>event.target).classList.contains('mdc-dialog__footer__button--accept')) {
          this.accept();
        } else if ((<any>event.target).classList.contains('mdc-dialog__footer__button--cancel')) {
          this.cancel();
        }
      };
      this._registry.listen(evt, handler, this._getHostElement());
    },
    deregisterInteractionHandler: (evt: string, handler: EventListener) => this._registry.unlisten(evt, handler),
    registerSurfaceInteractionHandler: (evt: string, handler: EventListener) =>
      this._registry.listen(evt, handler, this._surface),
    deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => this._registry.unlisten(evt, handler),
    registerDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this.config ? this.config.escapeToClose : this.escapeToClose;

      handler = escapeToClose ? handler : this._onKeyDown;
      this._registry.listen('keydown', handler, document);
    },
    deregisterDocumentKeydownHandler: (handler: EventListener) => {
      if (!isBrowser()) { return; }

      const escapeToClose = this.config ? this.config.escapeToClose : this.escapeToClose;
      this._registry.unlisten('keydown', escapeToClose ? handler : this._onKeyDown);
    },
    registerTransitionEndHandler: (handler: EventListener) => this._registry.listen('transitionend', handler, this._surface),
    deregisterTransitionEndHandler: (handler: EventListener) => this._registry.unlisten('transitionend', handler),
    notifyAccept: () => {
      this._accept.emit();
      // this.close();
    },
    notifyCancel: () => {
      this._cancel.emit();
      // this.close();
    },
    trapFocusOnSurface: () => {
      if (this._focusTrap) {
        this._focusTrap.activate();
      }
    },
    untrapFocusOnSurface: () => {
      if (this._focusTrap) {
        this._focusTrap.deactivate();
      }
    },
    isDialog: (el: Element) => this._surface ? el === this._surface : false
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(): void,
    isOpen(): boolean,
    accept(shouldNotify: boolean): void,
    cancel(shouldNotify: boolean): void
  } = new MDCDialogFoundation(this._mdcAdapter);

  constructor(
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    @Optional() @SkipSelf() public dialogRef: MdcDialogRef<any>) { }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (ESCAPE === event.keyCode) {
      event.stopPropagation();
    }
  }

  show(): void {
    const focusedEl = this._actions.find((_) => _.focused || _.accept);

    if (isBrowser()) {
      this._focusTrap = util.createFocusTrapInstance(this._surface, {
        initialFocus: focusedEl ? focusedEl.getHostElement() : this.elementRef.nativeElement,
        clickOutsideDeactivates: this.config ? this.config.clickOutsideToClose : this.clickOutsideToClose,
        escapeDeactivates: this.config ? this.config.escapeToClose : this.escapeToClose,
      });
    }
    setTimeout(() => {
      this._foundation.open();
      this.opened.emit();

      if (focusedEl) {
        focusedEl.focus();
      }
    }, 10);
  }

  close(): void {
    this.closed.emit();
    this._foundation.close();
  }

  isOpen(): boolean {
    return this._foundation.isOpen();
  }

  accept(shouldNotify: boolean = true): void {
    this._foundation.accept(shouldNotify);
  }

  cancel(shouldNotify: boolean = true): void {
    this._foundation.cancel(shouldNotify);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
