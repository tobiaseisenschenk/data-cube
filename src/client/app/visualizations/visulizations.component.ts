import { Component, ElementRef, OnDestroy, OnInit, Renderer, ViewChild } from '@angular/core';
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
  public showChart :boolean = false;
  public chartType :string = 'radar';
  public radarChartLabels :string[];
  public radarChartData :any = [];
  public radarChartOptions :any = [];

  // Data Collections
  public allEvaluationMethods :Array<any> = [];
  public degreeOptions :Array<string>;
  private allEvaluations :Array<Evaluation> = [];

  // Subscriptions
  private dataSubscription :any;

  constructor(private _logger :Logger,
              private _uxDataService :UXDataService, private renderer :Renderer) {}

  ngOnInit() {
    this.subscribeUXData();
    //this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    /*this.radarChartData = [
      {data: [65, 59, 90, 81, 56, 55, 50], label: 'Series A'},
      {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];*/
    this.radarChartOptions = {
      scale: {
        responsive: true,
        maintainAspectRatio: false,
        reverse: false,
        ticks: {
          beginAtZero: true
        }
      }
    };
    this.degreeOptions = [
      'Very Low',
      'Low',
      'Medium',
      'High',
      'Very High'
    ];
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  /* UI Functions */
  public chartClicked(e:any):void {
    this._logger.debug(e);
  }
  public chartHovered(e:any):void {
    this._logger.debug(e);
  }
  /* Helper Functions / Data Modification */
  private createChartData() {
    this.radarChartLabels = this.allEvaluationMethods.map((method :any) => method.name);
    let dataset :Array<number> = [];
    this.allEvaluationMethods.forEach((method :any) => {
      let count :number = 0;
      this.allEvaluations.forEach((evaluation :Evaluation) => {
        if (evaluation.eval_method.includes(method.id)) count++;
      });
      dataset.push(count);
    });
    this.radarChartData = [{ data: dataset, label: 'Evaluation Methods'}];
    this._logger.debug('[VisualizationsComponent] created Labels: ', this.radarChartLabels);
    this._logger.debug('[VisualizationsComponent] created ChartData: ', this.radarChartData);
    this.showChart = true;
  }

  /* Subscriptions */
  private subscribeUXData() {
    this.dataSubscription = Observable.combineLatest(
      this._uxDataService.evaluations,
      this._uxDataService.evaluationMethods
    ).subscribe((res :Array<any>) => {
      this.allEvaluations = res[0].map((snapshot :any) => new Evaluation(snapshot.val()));
      this.allEvaluationMethods = res[1];
      this._logger.debug('[VisualizationsComponent] received UXData: ', this.allEvaluations, this.allEvaluationMethods);
      this.createChartData();
    });
  }



}
