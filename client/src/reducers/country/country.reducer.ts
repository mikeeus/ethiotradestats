import { Country } from '@models';

// tslint:disable:interface-name
export interface CountryState {
  allCountries: string[];
  fetchedCountries: Country[];
  selected: Country | null;
}

const initialState: CountryState = {
  allCountries: [
    'Canada',
    'China',
    'USA',
    'Germany',
    'Somalia',
  ],
  fetchedCountries: [],
  selected: null
};

export const countryReducer = (state: CountryState = initialState, _: any) => {
  return state;
};
