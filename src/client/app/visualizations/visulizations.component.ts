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
              private _uxDataService :UXDataService) {}

  ngOnInit() {
    this.subscribeUXData();
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
    this.testMotivations = ['Formative', 'Summative', 'Comparative', 'Informative'];
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
    this.radarChartData = [{ data: dataset, label: 'Evaluation Methods'}];
    this._logger.debug('[VisualizationsComponent] created Labels: ', this.radarChartLabels);
    this._logger.debug('[VisualizationsComponent] created ChartData: ', this.radarChartData);
    this.showRadarChart = true;
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
    });
  }



}
