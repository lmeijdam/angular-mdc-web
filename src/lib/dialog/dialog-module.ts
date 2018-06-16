import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcPortalService } from '@angular-mdc/web/common';

import {
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle
} from './dialog-directives';

import { MdcDialogComponent } from './dialog.component';
import { MdcDialog } from './dialog.service';

const DIALOG_DECLARATIONS = [
  MdcDialogComponent,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle
];

@NgModule({
  imports: [CommonModule],
  exports: DIALOG_DECLARATIONS,
  declarations: DIALOG_DECLARATIONS,
  providers: [MdcPortalService, MdcDialog],
  entryComponents: [MdcDialogComponent]
})
export class MdcDialogModule { }
