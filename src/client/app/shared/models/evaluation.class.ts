export class Evaluation {

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firebaseRef(): string {
    return this._firebaseRef;
  }

  set firebaseRef(value: string) {
    this._firebaseRef = value;
  }

  get owned_by(): string {
    return this._owned_by;
  }

  set owned_by(value: string) {
    this._owned_by = value;
  }

  get project_id(): number {
    return this._project_id;
  }

  set project_id(value: number) {
    this._project_id = value;
  }

  get num_eval(): number {
    return this._num_eval;
  }

  set num_eval(value: number) {
    this._num_eval = value;
  }

  get domain_knowledge(): string {
    return this._domain_knowledge;
  }

  set domain_knowledge(value: string) {
    this._domain_knowledge = value;
  }

  get interaction_knowledge(): string {
    return this._interaction_knowledge;
  }

  set interaction_knowledge(value: string) {
    this._interaction_knowledge = value;
  }

  get product_knowledge(): string {
    return this._product_knowledge;
  }

  set product_knowledge(value: string) {
    this._product_knowledge = value;
  }

  get task_knowledge(): string {
    return this._task_knowledge;
  }

  set task_knowledge(value: string) {
    this._task_knowledge = value;
  }

  get user_knowledge(): string {
    return this._user_knowledge;
  }

  set user_knowledge(value: string) {
    this._user_knowledge = value;
  }

  get eval_method(): Array<number> {
    return this._eval_method;
  }

  set eval_method(value: Array<number>) {
    this._eval_method = value;
  }

  get seq(): number {
    return this._seq;
  }

  set seq(value: number) {
    this._seq = value;
  }

  get sub_effectiveness(): string {
    return this._sub_effectiveness;
  }

  set sub_effectiveness(value: string) {
    this._sub_effectiveness = value;
  }

  get sus(): number {
    return this._sus;
  }

  set sus(value: number) {
    this._sus = value;
  }

  get test_motivation(): string {
    return this._test_motivation;
  }

  set test_motivation(value: string) {
    this._test_motivation = value;
  }

  get impact_on_redesign(): string {
    return this._impact_on_redesign;
  }

  set impact_on_redesign(value: string) {
    this._impact_on_redesign = value;
  }

  get date_shared(): Date {
    return this._date_shared;
  }

  set date_shared(value: Date) {
    this._date_shared = value;
  }

  get eval_exp(): number {
    return this._eval_exp;
  }

  set eval_exp(value: number) {
    this._eval_exp = value;
  }

  get eval_collab(): string {
    return this._eval_collab;
  }

  set eval_collab(value: string) {
    this._eval_collab = value;
  }
  // Internal Attributes
  private _id :number;
  private _firebaseRef :string;
  private _owned_by: string;
  private _date_shared :Date;
  private _project_id :number;
  // Evaluator Attributes
  private _eval_exp: number;
  private _eval_collab: string;
  private _num_eval :number;
  private _domain_knowledge :string;
  private _interaction_knowledge :string;
  private _product_knowledge :string;
  private _task_knowledge :string;
  private _user_knowledge :string;
  // Benchmark Attributes
  private _eval_method: Array<number>;
  private _seq :number;
  private _sub_effectiveness :string;
  private _sus :number;
  private _impact_on_redesign: string;
  private _test_motivation :string;

  constructor(obj :any) {
    this._id = obj.id;
    this._owned_by = obj.owned_by;
    this._firebaseRef = obj.firebaseRef ? obj.firebaseRef : undefined;
    this._date_shared = obj.date_shared ? obj.date_shared : undefined;
    this._project_id = obj.project_id ? obj.project_id : undefined;
    this._eval_exp = obj.eval_exp ? obj.eval_exp : undefined;
    this._num_eval = obj.num_eval ? obj.num_eval : undefined;
    this._eval_collab = obj.eval_collab ? obj.eval_collab : undefined;
    this._domain_knowledge = obj.domain_knowledge ? obj.domain_knowledge : undefined;
    this._interaction_knowledge = obj.interaction_knowledge ? obj.interaction_knowledge : undefined;
    this._product_knowledge = obj.product_knowledge ? obj.product_knowledge : undefined;
    this._task_knowledge = obj.task_knowledge ? obj.task_knowledge : undefined;
    this._user_knowledge = obj.user_knowledge ? obj.user_knowledge : undefined;
    this._eval_method = obj.eval_method ? obj.eval_method : undefined;
    this._seq = obj.seq ? obj.seq : undefined;
    this._sub_effectiveness = obj.sub_effectiveness ? obj.sub_effectiveness : undefined;
    this._sus = obj.sus ? obj.sus : undefined;
    this._impact_on_redesign = obj.impact_on_redesign ? obj.impact_on_redesign : undefined;
    this._test_motivation = obj.test_motivation ? obj.test_motivation : undefined;
  }

  public toJson(): any {
    return {
      'id': this._id,
      'owned_by': this._owned_by,
      'date_shared': this._date_shared.toISOString(),
      'project_id': this._project_id,
      'eval_exp': this._eval_exp,
      'num_eval': this._num_eval,
      'eval_collab': this._eval_collab ? this._eval_collab : null,
      'domain_knowledge': this._domain_knowledge,
      'interaction_knowledge': this._interaction_knowledge,
      'product_knowledge': this._product_knowledge,
      'task_knowledge': this._task_knowledge,
      'user_knowledge': this._user_knowledge,
      'eval_method': this._eval_method,
      'seq': this._seq ? this._seq : null,
      'sub_effectiveness': this._sub_effectiveness ? this._sub_effectiveness : null,
      'sus': this._sus ? this._sus : null,
      'impact_on_redesign': this._impact_on_redesign ? this._impact_on_redesign : null,
      'test_motivation': this._test_motivation
    };
  }
}
