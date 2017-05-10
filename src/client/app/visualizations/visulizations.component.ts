import { Component, ElementRef, OnDestroy, OnInit, Renderer, ViewChild } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { UXDataService } from '../shared/services/ux-data.service';
import { Project } from '../shared/models/project.class';
import { Evaluation } from '../shared/models/evaluation.class';
import { ToNumericValuePipe } from '../shared/pipes/toNumericValuePipe';
import { ToStringValuePipe } from '../shared/pipes/toStringValuePipe';
import { GetNamePipe } from '../shared/pipes/getNamePipe';

/**
 * This class represents the lazy loaded VisualizationsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'visualizations-component',
  templateUrl: 'visualizations.component.html'
})
export class VisualizationsComponent implements OnInit, OnDestroy {
  // Input Fields
  public testMotivationFilter :string;
  public devMethodFilter :any;
  public domainFilter :any;
  public productComplexityFilter :string;
  public userExpertiseFilter :string;
  public timeFilter :string;
  // UI Bindings
  public showRadarChart :boolean = false;
  public radarChartLabels :string[];
  public radarChartData :any = [];
  public radarChartOptions :any = [];
  public showBarChart :boolean = false;
  public barChartOptions :any = [];
  public barChartLabels :Array<any>;
  public barChartData :any = [];
  public chartColors :Array<any>;

  // Data Collections
  public allEvaluationMethods :Array<any> = [];
  public degreeOptions :Array<string>;
  public testMotivations :Array<string>;
  public allDevMethods :Array<any>;
  public allDomains :Array<any>;
  private allEvaluations :Array<Evaluation> = [];
  private allProjects :Array<Project> = [];

  // Subscriptions
  private dataSubscription :any;

  constructor(private _logger :Logger,
              private _uxDataService :UXDataService,
              private _toNumericValue :ToNumericValuePipe,
              private _toStringValue :ToStringValuePipe, private _getNamePipe :GetNamePipe) {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            callback: (value :any) => {
              // only show label for round values
              if (parseInt(value) === value) return _toStringValue.transform(value);
              else return '';
            }
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem :any, data :any) => {
            return _toStringValue.transform(tooltipItem.yLabel);
          }
        }
      }
    };
    this.radarChartOptions = {
      scale: {
        responsive: true,
        maintainAspectRatio: false,
        reverse: false,
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }
    };
    this.chartColors = [
      { // first color
        backgroundColor: 'rgba(174, 255, 181, 0.4)',
        borderColor: 'rgba(149, 231, 164, 0.2)',
        pointBackgroundColor: 'rgba(225,10,24,0.5)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
      },
      { // second color
        backgroundColor: 'rgba(201, 189, 255, 0.4)',
        borderColor: 'rgba(149, 134, 192, 0.5)',
        pointBackgroundColor: 'rgba(225,10,24,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
      }];
    this.degreeOptions = [
      'Very Low',
      'Low',
      'Medium',
      'High',
      'Very High'
    ];
    this.testMotivations = ['Formative', 'Summative', 'Comparative', 'Informative'];
  }

  ngOnInit() {
    this.subscribeUXData();
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
  /* UI Functions */

  /* Helper Functions / Data Modification */
  public createRadarChartData() {
    this.radarChartLabels = this.allEvaluationMethods.map((method :any) => method.name);
    let filteredProjects = this.allProjects.filter((project :Project) => {
      let passFilter :boolean;
      passFilter = (!this.devMethodFilter || project.dev_method === this.devMethodFilter.id);
      passFilter = passFilter && (!this.domainFilter || project.domain === this.domainFilter.id);
      passFilter = passFilter && (!this.productComplexityFilter ||
                                  project.product_complexity === this.productComplexityFilter);
      passFilter = passFilter && (!this.userExpertiseFilter ||
                                  project.user_expertise === this.userExpertiseFilter);
      passFilter = passFilter && (!this.timeFilter || project.time === this.timeFilter);
      return passFilter;
    });
    let dataset :Array<number> = [];
    this.allEvaluationMethods.forEach((method :any) => {
      let count :number = 0;
      this.allEvaluations.forEach((evaluation :Evaluation) => {
        // check if evaluation uses the method in question
        if (evaluation.eval_method.includes(method.id)) {
          // check if the evaluation also passes evaluation specific filters
          if (!this.testMotivationFilter ||
              !!this.testMotivationFilter && this.testMotivationFilter === evaluation.test_motivation) {
            // check if evaluation is also used by any project, which has passed pre-applied filters above
            if(filteredProjects.find(project => project.id === evaluation.project_id) !== undefined) count++;
          }
        }
      });
      dataset.push(count);
    });
    this.radarChartData = [{ data: dataset, label: 'Evaluation Methods' }];
    this._logger.debug('[VisualizationsComponent] created Labels: ', this.radarChartLabels);
    this._logger.debug('[VisualizationsComponent] created ChartData: ', this.radarChartData);
    this.showRadarChart = true;
  }
  public createBarChartData() {
    let filteredProjects = this.allProjects.filter((project :Project) => {
      let passFilter :boolean;
      passFilter = (!this.devMethodFilter || project.dev_method === this.devMethodFilter.id);
      passFilter = passFilter && (!this.domainFilter || project.domain === this.domainFilter.id);
      passFilter = passFilter && (!this.productComplexityFilter ||
        project.product_complexity === this.productComplexityFilter);
      passFilter = passFilter && (!this.userExpertiseFilter ||
        project.user_expertise === this.userExpertiseFilter);
      passFilter = passFilter && (!this.timeFilter || project.time === this.timeFilter);
      return passFilter;
    });
    let datasetX :Array<any> = []; // Objects in Array look like: { methods: [1,2,5], meanImpact: 4, impacts: [1, 4] }
    for(let evaluation of this.allEvaluations) {
      // only consider evaluations, which have impact on redesign specified and testMotivation matches
      if (!!evaluation.impact_on_redesign &&
        (evaluation.test_motivation === this.testMotivationFilter || !this.testMotivationFilter)) {
        // only consider evaluations assiciated to a project, which passed the filters
        if (filteredProjects.find(project => project.id === evaluation.project_id) !== undefined) {
          // check if evaluations method mix is already in the dataset
          let index = datasetX.findIndex(data => this.arrayHasSameElements(data.methods, evaluation.eval_method));
          // method mix is already in dataset -> compute mean and update element
          if (index !== -1) {
            datasetX[index].meanImpact =
              (datasetX[index].meanImpact + this._toNumericValue.transform(evaluation.impact_on_redesign)) /2;
            datasetX[index].impacts.push(this._toNumericValue.transform(evaluation.impact_on_redesign))
          } else {
            let obj :any = {
              'methods': evaluation.eval_method,
              'meanImpact':this._toNumericValue.transform(evaluation.impact_on_redesign),
              'impacts': [this._toNumericValue.transform(evaluation.impact_on_redesign)]
            };
            datasetX.push(obj);
          }
        }
      }
    }
    let meanImpactData :Array<number> = datasetX.map(x => x.meanImpact);
    let medianImpactData :Array<number> = datasetX.map(x => this.getMedian(x.impacts));
    this.barChartData = [
      { data: meanImpactData, label: 'Mean Impact'},
      { data: medianImpactData, label: 'Median Impact'}];
    this.barChartLabels = datasetX.map((x :any) => this._getNamePipe.transform(this.allEvaluationMethods, x.methods));
    this._logger.debug('[VisualizationsComponent] created BarChartData: ', this.barChartData);
    this._logger.debug('[VisualizationsComponent] created Labels: ', this.barChartLabels);
    this.showBarChart = true;
  }
  private arrayHasSameElements(array1 :Array<number>, array2 :Array<number>) :boolean {
    array1 = array1.sort();
    array2 = array2.sort();
    let maxLength :number = Math.max.apply(Math, [array1.length, array2.length]);
    for (let i = 0; i < maxLength; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }
  private getMedian(array :Array<number>) {
    array.sort();
    let half = Math.floor(array.length/2);
    if(array.length % 2)
      return array[half];
    else
      return (array[half-1] + array[half]) / 2.0;
  }

  /* Subscriptions */
  private subscribeUXData() {
    this.dataSubscription = Observable.combineLatest(
      this._uxDataService.evaluations,
      this._uxDataService.evaluationMethods,
      this._uxDataService.projects,
      this._uxDataService.dev_methods,
      this._uxDataService.domains
    ).subscribe((res :Array<any>) => {
      this.allEvaluations = res[0].map((snapshot :any) => new Evaluation(snapshot.val()));
      this.allEvaluationMethods = res[1];
      this.allProjects = res[2].map((snapshot :any) => new Project(snapshot.val()));
      this.allDevMethods = res[3];
      this.allDomains = res[4];
      this._logger.debug('[VisualizationsComponent] received UXData: ', res[3]);
      this.createRadarChartData();
      this.createBarChartData();
    });
  }



}
