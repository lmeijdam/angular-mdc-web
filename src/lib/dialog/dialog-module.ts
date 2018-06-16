import { NgModule } from '@angular/core';

import { MdcPortalService } from '@angular-mdc/web/common';

import {
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
} from './dialog-directives';

import { MdcDialogComponent } from './dialog.component';
import { MdcDialog } from './dialog';

const DIALOG_DECLARATIONS = [
  MdcDialogComponent,
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface
];

@NgModule({
  exports: DIALOG_DECLARATIONS,
  declarations: DIALOG_DECLARATIONS,
  providers: [MdcPortalService, MdcDialog],
  entryComponents: [MdcDialogComponent],
})
export class MdcDialogModule { }
