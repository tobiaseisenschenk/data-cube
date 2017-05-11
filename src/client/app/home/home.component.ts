import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styles: [`
    .border-top {
      border-top: 0.1rem solid #E0E0E0;
    }
  `]
})
export class HomeComponent {
  constructor() {}
}
