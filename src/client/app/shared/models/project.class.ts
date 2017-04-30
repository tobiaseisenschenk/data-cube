export class Project {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get owned_by(): string {
    return this._owned_by;
  }

  set owned_by(value: string) {
    this._owned_by = value;
  }

  get budget(): string {
    return this._budget;
  }

  set budget(value: string) {
    this._budget = value;
  }

  get dev_method(): number {
    return this._dev_method;
  }

  set dev_method(value: number) {
    this._dev_method = value;
  }

  get domain(): number {
    return this._domain;
  }

  set domain(value: number) {
    this._domain = value;
  }

  get product_complexity(): string {
    return this._product_complexity;
  }

  set product_complexity(value: string) {
    this._product_complexity = value;
  }

  get team_size(): string {
    return this._team_size;
  }

  set team_size(value: string) {
    this._team_size = value;
  }

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }

  get user_avg_age(): string {
    return this._user_avg_age;
  }

  set user_avg_age(value: string) {
    this._user_avg_age = value;
  }

  get user_expertise(): string {
    return this._user_expertise;
  }

  set user_expertise(value: string) {
    this._user_expertise = value;
  }

  get user_diversity(): string {
    return this._user_diversity;
  }

  set user_diversity(value: string) {
    this._user_diversity = value;
  }

  get date_shared(): Date {
    return this._date_shared;
  }

  set date_shared(value: Date) {
    this._date_shared = value;
  }

  get dev_process_maturity(): number {
    return this._dev_process_maturity;
  }

  set dev_process_maturity(value: number) {
    this._dev_process_maturity = value;
  }

  get market_descr(): Array<number> {
    return this._market_descr;
  }

  set market_descr(value: Array<number>) {
    this._market_descr = value;
  }

  get market_diversity(): string {
    return this._market_diversity;
  }

  set market_diversity(value: string) {
    this._market_diversity = value;
  }

  get user_languages(): Array<number> {
    return this._user_languages;
  }

  set user_languages(value: Array<number>) {
    this._user_languages = value;
  }

  get user_location(): Array<number> {
    return this._user_location;
  }

  set user_location(value: Array<number>) {
    this._user_location = value;
  }

  get domainName(): string {
    return this._domainName;
  }

  set domainName(value: string) {
    this._domainName = value;
  }
  // mandatory
  _owned_by :string;
  private _id :number;
  private _budget :string;
  private _dev_method :number;
  private _domain :number;
  private _product_complexity :string;
  private _team_size :string;
  private _time : string;
  private _user_avg_age :string;
  private _user_expertise :string;
  private _user_diversity :string;
  private _date_shared :Date;

  // optional
  private _dev_process_maturity :number;
  private _market_descr :Array<number>;
  private _market_diversity :string;
  private _user_languages :Array<number>;
  private _user_location :Array<number>;

  // front-end only
  private _domainName :string;

  // TODO provide default values for parameters which should be optional
  constructor(obj :any) {
    // must be provided at construction
    this._owned_by = obj.owned_by;
    this._id = obj.id;
    // optional parameters
    this._budget = obj.budget ? obj.budget : undefined;
    this._dev_method = obj.dev_method ? obj.dev_method : undefined;
    this._domain = obj.domain ? obj.domain : undefined;
    this._product_complexity = obj.product_complexity ? obj.product_complexity : undefined;
    this._team_size = obj.team_size ? obj.team_size : undefined;
    this._time = obj.time ? obj.time : undefined;
    this._user_avg_age = obj.user_avg_age ? obj.user_avg_age : undefined;
    this._user_expertise = obj.user_expertise ? obj.user_expertise : undefined;
    this._user_diversity = obj.user_diversity ? obj.user_diversity : undefined;
    this._date_shared = obj.date_shared ? obj.date_shared : undefined;
    this._dev_process_maturity = obj.dev_process_maturity ? obj.dev_process_maturity : undefined;
    this._market_descr = obj.market_descr ? obj.market_descr : undefined;
    this._market_diversity = obj.market_diversity ? obj.market_diversity : undefined;
    this._user_languages = obj.user_languages ? obj.user_languages : undefined;
    this._user_location = obj.user_location ? obj.user_location : undefined;
  }

  public toJson(): any {

    let projectJson: any = {
      id: this._id,
      owned_by: this._owned_by,
      budget: this._budget,
      dev_method: this._dev_method,
      domain: this._domain,
      product_complexity: this._product_complexity,
      team_size: this._team_size,
      time: this._time,
      user_avg_age: this._user_avg_age,
      user_expertise: this._user_expertise,
      user_diversity: this._user_diversity,
      date_shared: this._date_shared.toISOString(),
      dev_process_maturity: this._dev_process_maturity ? this._dev_process_maturity : undefined,
      market_descr: this._market_descr ? this._market_descr : [],
      market_diversity: this._market_diversity ? this._market_diversity : '',
      user_languages: this._user_languages ? this._user_languages : [],
      user_location: this._user_location ? this._user_location : []
    };
    return projectJson;
  }
}
