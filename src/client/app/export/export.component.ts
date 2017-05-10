import { Component, OnDestroy, OnInit } from '@angular/core';
import { UXDataService } from '../shared/services/ux-data.service';
import { Logger } from 'angular2-logger/core';
import { Angular2Csv } from 'angular2-csv';
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/models/project.class';
import { Evaluation } from '../shared/models/evaluation.class';
import { DatePipe } from '@angular/common';
import { GetNamePipe } from '../shared/pipes/getNamePipe';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'export-component',
  templateUrl: 'export.component.html',
  styles: [`
    .sub-element {
       border-left: 2rem solid transparent;
    }
  `]
})
export class ExportComponent implements OnInit, OnDestroy {
  public data :any;
  // Input Bindings
  public dataSelectionInput :string;
  public filename :string = '';
  // Project Attributes
  public allProjectData :boolean;
  public allMarketData :boolean;
  public allUserData :boolean;
  public budgetInput :boolean;
  public devMethodInput :boolean;
  public domainInput :boolean;
  public productComplexityInput :boolean;
  public teamSizeInput :boolean;
  public timeInput :boolean;
  public userAvgAgeInput :boolean;
  public userExpertiseInput :boolean;
  public userDiversityInput :boolean;
  public dateSharedInput :boolean;
  public devProcessMaturityInput :boolean;
  public marketDescrInput :boolean;
  public marketDiversityInput :boolean;
  public userLanguagesInput :boolean;
  public userLocationInput :boolean;
  // Evaluation Attributes
  public allBenchmarkData :boolean;
  public allEvaluatorData :boolean;
  public EvaldateSharedInput :boolean;
  public evalExpInput :boolean;
  public numEvalInput :boolean;
  public evalCollabInput :boolean;
  public domainKnowledgeInput :boolean;
  public interactKnowledgeInput :boolean;
  public productKnowledgeInput :boolean;
  public taskKnowledgeInput :boolean;
  public userKnowledgeInput :boolean;
  public evalMethodInput :boolean;
  public seqInput :boolean;
  public subEffectivenessInput :boolean;
  public susInput :boolean;
  public impactOnRedesignInput :boolean;
  public testMotivationInput :boolean;
  // Data Collections
  public allProjects :Array<Project>;
  public allEvaluations :Array<Evaluation>;
  private _allDevMethods :Array<any>;
  private _allMarketDescr :Array<any>;
  private _allDomains :Array<any>;
  private _allCountries :Array<any>;
  private _allLanguages :Array<any>;
  private _subscriptions :any;
  constructor(private _uXDataService :UXDataService, private _logger :Logger, private _datePipe :DatePipe,
              private _getNamePipe :GetNamePipe) {}
  ngOnInit() {
    this.subscribeUXData();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
  filterProjectData() {
    this._logger.debug('[ExportComponent] filtering UX Data for download...');
    return this.allProjects.map((project :Project) => {
      let exportObj :any = {};
      if (this.budgetInput) exportObj.Project_Budget = project.budget.toString();
      if (this.timeInput) exportObj.Project_Time = project.time.toString();
      if (this.devMethodInput) exportObj.Development_Methodology =
        this._getNamePipe.transform(this._allDevMethods, [project.dev_method]);
      if (this.productComplexityInput) exportObj.Product_Complexity = project.product_complexity.toString();
      if (this.teamSizeInput) exportObj.Team_Size = project.team_size.toString();
      if (this.dateSharedInput) exportObj.Report_Date = this._datePipe.transform(project.date_shared).toString();
      if (this.devProcessMaturityInput) exportObj.Development_Process_Maturity =
        UXDataService.devProcessMaturityOptions[project.dev_process_maturity -1].name;
      if (this.marketDescrInput) exportObj.Market_Descriptions =
        this._getNamePipe.transform(this._allMarketDescr, project.market_descr).toString();
      if (this.domainInput) exportObj.Domain =
        this._getNamePipe.transform(this._allDomains, [project.domain]);
      if (this.userLocationInput) exportObj.User_Country =
        this._getNamePipe.transform(this._allCountries, project.user_location).toString();
      if (this.marketDiversityInput) exportObj.Market_Diversity = project.market_diversity.toString();
      if (this.userExpertiseInput) exportObj.User_Expertise = project.user_expertise.toString();
      if (this.userDiversityInput) exportObj.User_Diversity = project.user_diversity.toString();
      if (this.userAvgAgeInput) exportObj.Average_User_Age = project.user_avg_age.toString();
      if (this.userLanguagesInput) exportObj.User_Languages =
        this._getNamePipe.transform(this._allLanguages, project.user_languages).toString();
      return exportObj;
    });
  }
  filterEvaluationData() {
    this._logger.debug('[ExportComponent] filtering UX Data for download...');
    return this.allEvaluations.map((evalu :Evaluation) => {
      let exportObj :any = {};
      if (this.EvaldateSharedInput) exportObj.Report_Date = this._datePipe.transform(evalu.date_shared).toString();
      if (this.evalExpInput) exportObj.Evaluator_Experience =
        evalu.eval_exp ? evalu.eval_exp.toString() : '';
      if(this.numEvalInput) exportObj.Number_Evaluators = evalu.num_eval.toString();
      if (this.evalCollabInput) exportObj.Evaluator_Collaboration =
        evalu.eval_collab ? evalu.eval_collab.toString() : '';
      if (this.domainKnowledgeInput) exportObj.Domain_Knowledge = evalu.domain_knowledge.toString();
      if (this.interactKnowledgeInput) exportObj.Interaction_Knowledge = evalu.interaction_knowledge.toString();
      if (this.productKnowledgeInput) exportObj.Product_Knowledge = evalu.product_knowledge.toString();
      if (this.taskKnowledgeInput) exportObj.Task_Knowledge = evalu.task_knowledge.toString();
      if (this.userKnowledgeInput) exportObj.User_Knowledge = evalu.user_knowledge.toString();
      if (this.evalMethodInput) exportObj.Evaluation_Methods = evalu.eval_method.toString();
      if (this.seqInput) exportObj.SEQ =
        evalu.seq ? evalu.seq.toString() : '';
      if (this.subEffectivenessInput) exportObj.Subjective_Effectiveness =
        evalu.sub_effectiveness ? evalu.sub_effectiveness.toString() : '';
      if (this.susInput) exportObj.SUS =
        evalu.sus ? evalu.sus.toString() : '';
      if (this.impactOnRedesignInput) exportObj.Impact_On_Redesign =
        evalu.impact_on_redesign ? evalu.impact_on_redesign.toString() : '';
      if (this.testMotivationInput) exportObj.Test_Motivation =
        evalu.test_motivation ? evalu.test_motivation.toString() : '';
      return exportObj;
    });
  }
  download() {
    let options = { 'showLabels': true };
    if (this.dataSelectionInput === 'Projects') {
      let data = this.filterProjectData();
      console.log(data);
      let x = new Angular2Csv(data, this.filename, options);
    }
    if (this.dataSelectionInput === 'Evaluations') {
      let data = this.filterEvaluationData();
      console.log(data);

      let x = new Angular2Csv(data, this.filename, options);
    }
  }
  selectAllProjectData() {
    this.budgetInput = this.allProjectData;
    this.timeInput = this.allProjectData;
    this.devMethodInput = this.allProjectData;
    this.productComplexityInput = this.allProjectData;
    this.teamSizeInput = this.allProjectData;
    this.dateSharedInput = this.allProjectData;
    this.devProcessMaturityInput = this.allProjectData;
  }
  selectAllMarketData() {
    this.marketDescrInput = this.allMarketData;
    this.domainInput = this.allMarketData;
    this.userLocationInput = this.allMarketData;
    this.marketDiversityInput = this.allMarketData;
  }
  selectAllUserData() {
    this.userExpertiseInput = this.allUserData;
    this.userDiversityInput = this.allUserData;
    this.userAvgAgeInput = this.allUserData;
    this.userLanguagesInput = this.allUserData;
  }
  selectAllEvaluatorData() {
    this.EvaldateSharedInput = this.allEvaluatorData;
    this.evalExpInput = this.allEvaluatorData;
    this.numEvalInput = this.allEvaluatorData;
    this.evalCollabInput = this.allEvaluatorData;
    this.domainKnowledgeInput = this.allEvaluatorData;
    this.interactKnowledgeInput = this.allEvaluatorData;
    this.productKnowledgeInput = this.allEvaluatorData;
    this.taskKnowledgeInput = this.allEvaluatorData;
    this.userKnowledgeInput = this.allEvaluatorData;
  }
  selectAllBenchmarkData() {
    this.evalMethodInput = this.allBenchmarkData;
    this.seqInput = this.allBenchmarkData;
    this.subEffectivenessInput = this.allBenchmarkData;
    this.susInput = this.allBenchmarkData;
    this.impactOnRedesignInput = this.allBenchmarkData;
    this.testMotivationInput = this.allBenchmarkData;
  }
  /* Subscriptions */
  subscribeUXData() {
    this._subscriptions = Observable.combineLatest(
      this._uXDataService.projects,
      this._uXDataService.evaluations,
      this._uXDataService.dev_methods,
      this._uXDataService.market_descr,
      this._uXDataService.domains,
      this._uXDataService.countries,
      this._uXDataService.languages
    ).subscribe((res :Array<any>) => {
      this.allProjects = res[0].map((snapshot :any) => new Project(snapshot.val()));
      this.allEvaluations = res[1].map((snapshot :any) => new Evaluation(snapshot.val()));
      this._allDevMethods = res[2];
      this._allMarketDescr = res[3];
      this._allDomains = res[4];
      this._allCountries = res[5];
      this._allLanguages = res[6];
      this._logger.debug('[ExportComponent] received UX Data', this._allLanguages, this._allCountries);
    });
  }
}
