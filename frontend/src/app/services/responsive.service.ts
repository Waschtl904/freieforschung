import { Injectable, inject, signal, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  private bo = inject(BreakpointObserver);

  // Handset, Tablet, Desktop
  isHandset = toSignal(
    this.bo.observe(Breakpoints.Handset).pipe(map(r => r.matches)),
    { initialValue: false }
  );
  isTablet = toSignal(
    this.bo.observe(Breakpoints.Tablet).pipe(map(r => r.matches)),
    { initialValue: false }
  );
  isDesktop = toSignal(
    this.bo.observe(Breakpoints.Web).pipe(map(r => r.matches)),
    { initialValue: true }
  );

  // Form-Layout-Klasse basierend auf Device
  formLayoutClass = computed(() => {
    if (this.isHandset()) return 'mobile-form-layout';
    if (this.isTablet()) return 'tablet-form-layout';
    return 'desktop-form-layout';
  });
}
