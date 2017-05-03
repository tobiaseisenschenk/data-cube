import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AbstractControl, FormBuilder , FormGroup, Validators } from '@angular/forms';
import { UXDataService } from '../shared/services/ux-data.service';
import { Evaluation } from '../shared/models/evaluation.class';

/**
 * This class represents the lazy loaded AddEvaluationComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'add-evaluation-component',
  templateUrl: 'add-evaluation.component.html',
  styleUrls: ['add-evaluation.component.css']
})
export class AddEvaluationComponent implements OnInit, OnDestroy {
  public addEvaluationForm :FormGroup;
  // Input Fields
  public evalExpInput :AbstractControl;
  public evalCollabInput :AbstractControl;
  public numEvalInput :AbstractControl;
  public domainKnowledgeInput :AbstractControl;
  public interactionKnowledgeInput :AbstractControl;
  public productKnowledgeInput :AbstractControl;
  public userKnowledgeInput :AbstractControl;
  public taskKnowledgeInput :AbstractControl;
  public evalMethodInput :AbstractControl;
  public seqInput :AbstractControl;
  public subEffectivenessInput :AbstractControl;
  public susInput :AbstractControl;
  public testMotivationInput :AbstractControl;

  // Data Collections - public
  public numberArray :Array<number>;
  public degreeOptions :any;
  public allEvalMethods :Array<any>;
  public selectedEvalMethods :Array<any>;
  public susValues :Array<number>;
  public testMotivations :Array<string>;
  // Loading information
  public loading :boolean;
  private _userIsLoading :boolean;
  private _methodsIsLoading :boolean;
  private _evaluationsIsLoading :boolean;
  // Data Collections - private
  private _evaluationId :number;
  private _currentUser :any;
  // Subscriptions
  private userSubscription :any;
  private evaluationSubscription :any;
  private evalMethodsSubscription :any;


  constructor(private _logger :Logger,
              private _authenticationService :AuthenticationService,
              private _uxDataService :UXDataService,
              private _formbuilder: FormBuilder) {}

  ngOnInit() {
    this.loading = this._userIsLoading && this._methodsIsLoading && this._evaluationsIsLoading;
    this.subscribeCurrentUser();
    this.subscribeEvaluations();
    this.subscribeEvalMethods();
    this.addEvaluationForm = this._formbuilder.group({
      'evalExpInput': ['', Validators.compose([Validators.required])],
      'evalCollabInput': ['', Validators.compose([])],
      'numEvalInput': ['', Validators.compose([Validators.required])],
      'domainKnowledgeInput': ['', Validators.compose([Validators.required])],
      'interactionKnowledgeInput': ['', Validators.compose([Validators.required])],
      'productKnowledgeInput': ['', Validators.compose([Validators.required])],
      'userKnowledgeInput': ['', Validators.compose([Validators.required])],
      'taskKnowledgeInput': ['', Validators.compose([Validators.required])],
      'evalMethodInput': ['', Validators.compose([])],
      'seqInput': ['', Validators.compose([])],
      'subEffectivenessInput': ['', Validators.compose([])],
      'susInput': ['', Validators.compose([])],
      'testMotivationInput': ['', Validators.compose([Validators.required])],
    });

    this.evalExpInput = this.addEvaluationForm.controls['evalExpInput'];
    this.evalCollabInput = this.addEvaluationForm.controls['evalCollabInput'];
    this.numEvalInput = this.addEvaluationForm.controls['numEvalInput'];
    this.domainKnowledgeInput = this.addEvaluationForm.controls['domainKnowledgeInput'];
    this.interactionKnowledgeInput = this.addEvaluationForm.controls['interactionKnowledgeInput'];
    this.productKnowledgeInput = this.addEvaluationForm.controls['productKnowledgeInput'];
    this.userKnowledgeInput = this.addEvaluationForm.controls['userKnowledgeInput'];
    this.taskKnowledgeInput = this.addEvaluationForm.controls['taskKnowledgeInput'];
    this.evalMethodInput = this.addEvaluationForm.controls['evalMethodInput'];
    this.seqInput = this.addEvaluationForm.controls['seqInput'];
    this.subEffectivenessInput = this.addEvaluationForm.controls['subEffectivenessInput'];
    this.susInput = this.addEvaluationForm.controls['susInput'];
    this.testMotivationInput = this.addEvaluationForm.controls['testMotivationInput'];

    this.numberArray = Array.from(Array(60).keys());
    this.degreeOptions = [
      'Low',
      'Medium',
      'High'
    ];
    this.selectedEvalMethods = [];
    this.susValues = Array.from(Array(101).keys()).slice(1);
    this.testMotivations = ['Formative', 'Summative', 'Comparative', 'Informative'];
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.evaluationSubscription.unsubscribe();
    this.evalMethodsSubscription.unsubscribe();
    this._uxDataService.projectIdSelectedForEvaluation.next(null);
  }
  /* UI Functions */
  isProjectSelected() :boolean {
    return typeof this._uxDataService.projectIdSelectedForEvaluation.getValue() === 'number';
  }
  checkEvalMethodInput() {
    let methodExists :boolean = false;
    if (typeof this.evalMethodInput.value === 'string') {
      this.selectedEvalMethods.forEach((method :any) => {
        if (method.name.includes(this.evalMethodInput.value)) {
          methodExists = true;
          this.evalMethodInput.reset();
        }
      });
      if (!methodExists) {
        this.allEvalMethods.forEach((method :any) => {
          if (method.name.includes(this.evalMethodInput.value)) {
            this._logger.debug('[AddEvaluationComponent] language already exists!');
            this.selectedEvalMethods.push(method);
            methodExists = true;
            this.evalMethodInput.reset();
          }
        });
      }
      if (!methodExists) {
        this._logger.debug('[AddEvaluationComponent] adding new evaluation method...');
        let newMethod = { 'id': this.allEvalMethods.length + 1, 'name': this.evalMethodInput.value };
        this.selectedEvalMethods.push(newMethod);
        this._uxDataService.addEvalMethod(newMethod);
        this.evalMethodInput.reset();
      }
    }
  }
  selectEvalMethod(evalMethod :any) {
    if (!evalMethod) return;
    let methodExists :boolean = false;
    this.selectedEvalMethods.forEach(method => {
      if (method.name.includes(evalMethod.name)) methodExists = true;
    });
    if (!methodExists) {
      this.selectedEvalMethods.push(evalMethod);
    }
  }
  deselectEvalMethod(evalMethod :any) {
    if (!evalMethod) return;
    this.selectedEvalMethods = this.selectedEvalMethods.filter((Obj :any) => {
      return evalMethod.id !== Obj.id;
    });
  }
  /* Helper Functions / Data Modification */
  onSubmit() {
    this.checkEvalMethodInput();
    let newEvaluation = new Evaluation({ 'id': this._evaluationId, 'owned_by': this._currentUser.auth.uid });
    newEvaluation.date_shared = new Date();
    newEvaluation.project_id = this._uxDataService.projectIdSelectedForEvaluation.getValue();
    newEvaluation.eval_exp = this.evalExpInput.value;
    newEvaluation.num_eval = this.numEvalInput.value;
    newEvaluation.eval_collab = this.evalCollabInput.value;
    newEvaluation.domain_knowledge = this.domainKnowledgeInput.value;
    newEvaluation.interaction_knowledge = this.interactionKnowledgeInput.value;
    newEvaluation.product_knowledge = this.productKnowledgeInput.value;
    newEvaluation.task_knowledge = this.taskKnowledgeInput.value;
    newEvaluation.user_knowledge = this.userKnowledgeInput.value;
    newEvaluation.eval_method = [];
    this.selectedEvalMethods.forEach((evalMethod :any) => {
      newEvaluation.eval_method.push(evalMethod.id);
    });
    if (!!this.seqInput.value) newEvaluation.seq = this.seqInput.value.toFixed(2);
    newEvaluation.sub_effectiveness = this.subEffectivenessInput.value;
    newEvaluation.sus = this.susInput.value;
    newEvaluation.test_motivation = this.testMotivationInput.value;
    this._uxDataService.addEvaluation(newEvaluation);
  }
  /* Subscriptions */
  private subscribeCurrentUser() {
    this._userIsLoading = true;
    this.userSubscription = this._authenticationService.currentUser.subscribe((user :any) => {
      this._logger.debug('[AddEvaluationComponent] received current user: ', user);
      this._currentUser = user;
      this._userIsLoading = false;
    });
  }
  private subscribeEvaluations() {
    this._evaluationsIsLoading = true;
    this.evaluationSubscription = this._uxDataService.evaluations.subscribe((evaluations :any) => {
      this._evaluationId = evaluations.length + 1;
      this._evaluationsIsLoading = false;
    });
  }
  private subscribeEvalMethods() {
    this._methodsIsLoading = true;
    this.evalMethodsSubscription = this._uxDataService.evaluationMethods.subscribe((methods :any) => {
      this._logger.debug('[AddEvaluationComponent] received evaluation methods: ', methods);
      this.allEvalMethods = methods;
      this._methodsIsLoading = false;
    });
  }
}
