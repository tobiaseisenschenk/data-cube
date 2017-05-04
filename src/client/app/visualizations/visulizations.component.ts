import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UXDataService } from '../shared/services/ux-data.service';
import { Project } from '../shared/models/project.class';
import { Evaluation } from '../shared/models/evaluation.class';

/**
 * This class represents the lazy loaded VisualizationsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'visualizations-component',
  templateUrl: 'visualizations.component.html'
  //styleUrls: ['visualizations.components.css']
})
export class VisualizationsComponent implements OnInit, OnDestroy {

  // Input Fields
  // UI Bindings
  public chartType :string = 'radar';
  public radarChartLabels :string[];
  public radarChartData:any;

  // Data Collections


  // Subscriptions


  constructor(private _logger :Logger,
              private _uxDataService :UXDataService) {}

  ngOnInit() {
    this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    this.radarChartData = [
      {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
  }
  ngOnDestroy() {
  }
  /* UI Functions */
  public chartClicked(e:any):void {
    this._logger.debug(e);
  }
  public chartHovered(e:any):void {
    this._logger.debug(e);
  }
  /* Helper Functions / Data Modification */

  /* Subscriptions */




}
