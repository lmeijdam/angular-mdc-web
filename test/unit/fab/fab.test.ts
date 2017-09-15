import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcFabComponent, MdcFabIconDirective, MdcFabModule } from '../../../src/lib/public_api';

describe('MdcFabComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcFabModule],
      declarations: [
        SimpleButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('button[mdc-fab]', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcFabComponent;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcFabComponent));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-fab by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-fab', 'Expected buttons to have mdc-fab');
      expect(buttonInstance.isHostClass).toBe(true);
    });

    it('#should apply class based on property', () => {
      testComponent.isMini = true;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList.contains('mdc-fab--mini')).toBe(true);
    });

    it('#should disable ripple', () => {
      testComponent.isRippleDisabled = true;
      fixture.detectChanges();
      expect(buttonInstance.disableRipple).toBeTruthy('Expected fab ripple to be disabled');
    });

    it('#should handle a click on the button', () => {
      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <button mdc-fab
      (click)="increment()"
      [disableRipple]="isRippleDisabled"
      [mini]="isMini">
      <mdc-fab-icon>search</mdc-fab-icon>
    </button>
  `,
})
class SimpleButton {
  isMini: boolean = false;
  isRippleDisabled: boolean = false;
  clickCount: number = 0;

  increment() {
    this.clickCount++;
  }
}
