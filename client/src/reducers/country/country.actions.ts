import { Action } from 'redux';

import { Country } from '@models';

export enum ActionTypes {
  LOAD_ALL = '[Country] Load All',
  LOAD_ALL_SUCCESS = '[Country] Load All Success',

  LOAD = '[Country] Load',
  LOAD_SUCCESS = '[Country] Load Success',
  LOAD_FAIL = '[Country] Load Fail',
}

// tslint:disable:max-classes-per-file
export class LoadAll implements Action {
  public readonly type = ActionTypes.LOAD_ALL;
}
export class LoadAllSuccess implements Action {
  public readonly type = ActionTypes.LOAD_ALL_SUCCESS;
}

export class Load implements Action {
  public readonly type = ActionTypes.LOAD;
  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  public readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Country) {}
}

export class LoadFail implements Action {
  public readonly type = ActionTypes.LOAD_FAIL;
}

export type LoadActions = LoadAll
  | LoadAllSuccess

  | Load
  | LoadSuccess
  | LoadFail;
