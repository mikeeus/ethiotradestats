// tslint:disable:max-classes-per-file
// tslint:disable:interface-name

import axios, { AxiosResponse } from 'axios';

import { Hscode } from '@models';

export enum ActionTypes {
  SEARCH_HSCODES = '[Search] Hscodes',
  SEARCH_HSCODES_SUCCESS = '[Search] Hscodes Success',
  SEARCH_HSCODES_FAIL = '[Search] Hscodes Fail',
}

/*
 * Load Country Names
 */
export const searchHscodes = (query: string) => (dispatch: any) => {
  if (query.length < 3) {
    return;
  }

  const CancelToken = axios.CancelToken;
  let cancel;

  dispatch(requestHscodesSearch(query, cancel));

  axios
    .get('/api/hscodes/search/' + encodeURIComponent(query), {
      cancelToken: new CancelToken((c) => cancel = c)
    })
    .then((res: AxiosResponse<Hscode[]>) => {
      dispatch(searchHscodesSuccess(res.data));
    })
    .catch(err => dispatch(searchHscodesFail));
};

const requestHscodesSearch = (query: string, cancel: any): SearchHscodes => ({
  payload: { query, cancel },
  type: ActionTypes.SEARCH_HSCODES,
});
const searchHscodesSuccess = (hscodes: Hscode[]): SearchHscodesSuccess => ({
  payload: hscodes,
  type: ActionTypes.SEARCH_HSCODES_SUCCESS,
});
const searchHscodesFail: SearchHscodesFail = {
  type: ActionTypes.SEARCH_HSCODES_FAIL
};

interface SearchHscodes {
  payload: { query: string, cancel: any },
  type: ActionTypes.SEARCH_HSCODES,
}
interface SearchHscodesSuccess {
  payload: Hscode[],
  type: ActionTypes.SEARCH_HSCODES_SUCCESS,
}
interface SearchHscodesFail {
  type: ActionTypes.SEARCH_HSCODES_FAIL,
}

export type SearchActions = SearchHscodes
  | SearchHscodesSuccess
  | SearchHscodesFail;
