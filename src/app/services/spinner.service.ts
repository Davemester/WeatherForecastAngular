import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerRef: OverlayRef = this.createSpinner();
  spin$: Subject<boolean> = new Subject();
  constructor(private overlay: Overlay ) {
   }


  createSpinner() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
       .global()
       .centerHorizontally()
       .centerVertically()
      });
  }

  showSpinner() {
    this.spinnerRef.attach(new ComponentPortal(MatSpinner));
 }
 stopSpinner() {
    this.spinnerRef.detach();
 }
}
