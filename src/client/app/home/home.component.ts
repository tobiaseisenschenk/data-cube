import { Component, OnInit } from '@angular/core';
import { UXDataService } from '../shared/services/ux-data.service';
import { Logger } from 'angular2-logger/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  constructor(private _logger :Logger) {}
}
