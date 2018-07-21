import { Action } from 'redux';

import { Hscode } from '@models';

export enum ActionTypes {
  SEARCH = '[Hscodes] Search',
  SEARCH_SUCCESS = '[Hscodes] Search Success',
  SEARCH_FAIL = '[Hscodes] Search Fail',
}

// tslint:disable:max-classes-per-file
export class Search implements Action {
  public readonly type = ActionTypes.SEARCH;
  constructor(public payload: string) {}
}

export class SearchSuccess implements Action {
  public readonly type = ActionTypes.SEARCH_SUCCESS;
  constructor(public payload: Hscode[]) {}
}

export class SearchFail implements Action {
  public readonly type = ActionTypes.SEARCH_FAIL;
}

export type SearchActions = Search
  | SearchSuccess
  | SearchFail;
