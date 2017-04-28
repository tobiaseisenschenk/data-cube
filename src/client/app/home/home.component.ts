import { Component, OnInit } from '@angular/core';
import { UXDataService } from '../shared/services/ux-data.service';
import { Logger } from 'angular2-logger/core';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  public countries :any;
  constructor(private _uXDataService :UXDataService, private _logger :Logger) {}
  ngOnInit() {
    this.subscribeCountries();
  }

  subscribeCountries() {
    this._uXDataService.countries.subscribe((data) => {
      this._logger.debug('[HomeComponent] new countries', data);
      this.countries = data;
    });
  }

}
