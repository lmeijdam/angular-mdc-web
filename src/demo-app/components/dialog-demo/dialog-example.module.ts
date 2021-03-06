import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoMaterialModule } from '../../material.module';

import {
  DialogAlertExample,
  DialogScrollingExample,
  DialogSimpleExample,
  DialogNoFooterExample,
  DialogFormExample,
} from './dialog-demo';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
  ],
  declarations: [
    DialogAlertExample,
    DialogScrollingExample,
    DialogSimpleExample,
    DialogNoFooterExample,
    DialogFormExample,
  ],
  entryComponents: [
    DialogAlertExample,
    DialogSimpleExample,
    DialogScrollingExample,
    DialogNoFooterExample,
    DialogFormExample,
  ]
})
export class DialogExampleModule { }
