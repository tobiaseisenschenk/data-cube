export class Evaluation {

  // Internal Attributes
  private _id :number;
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
  private _test_motivation :string;

  constructor(obj :any) {
    this._id = obj.id;
    this._owned_by = obj.owned_by;
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
    this._test_motivation = obj.test_motivation ? obj.test_motivation : undefined;
  }

  public toJson(): any {
    let evaluationJson: any = {
      'id': this._id,
      'owned_by': this._owned_by,
      'date_shared': this._date_shared.toISOString(),
      'project_id': this._project_id,
      'eval_exp': this._eval_exp,
      'num_eval': this._num_eval,
      'eval_collab': this._eval_collab,
      'domain_knowledge': this._domain_knowledge,
      'interaction_knowledge': this._interaction_knowledge,
      'product_knowledge': this._product_knowledge,
      'task_knowledge': this._task_knowledge,
      'user_knowledge': this._user_knowledge,
      'eval_method': this._eval_method,
      'seq': this._seq,
      'sub_effectiveness': this._sub_effectiveness,
      'sus': this._sus,
      'test_motivation': this._test_motivation
    };
    return evaluationJson;
  }
}
