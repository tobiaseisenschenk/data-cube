import { Component, OnInit } from '@angular/core';
import { UXDataService } from '../shared/services/ux-data.service';
import { Logger } from 'angular2-logger/core';
import { Angular2Csv } from 'angular2-csv';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'export.component.html'
})
export class ExportComponent implements OnInit {
  public data :any;
  constructor(private _uXDataService :UXDataService, private _logger :Logger) {}
  ngOnInit() {
    this.data = [
      {
        name: 'Test 1',
        age: 13,
        average: 8.2,
        approved: true,
        description: 'ioashdoshaduhasdiuhsuid'
      },
      {
        name: 'Test 2',
        age: 11,
        average: 8.2,
        approved: true,
        description: 'asiodsahdiuhsadiuhsdui'
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: 'aiosdisdhiuashdiusidu'
      },
    ];
  }
  download() {
    let x = new Angular2Csv(this.data, 'My Report');
    console.log(x);
  }
}
