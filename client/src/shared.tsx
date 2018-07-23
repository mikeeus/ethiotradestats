import * as React from 'react';
import { Responsive } from 'react-responsive';

export const colors = {
  primary: '#2B283C',
  secondary: '#3e3c51',
}

export const Desktop = (props: any) => <Responsive {...props} minWidth={1281}/>;
export const Laptop = (props: any) => <Responsive {...props} minWidth={960} maxWidth={1280}/>;
export const Tablet = (props: any) => <Responsive {...props} minWidth={601} maxWidth={959}/>;
export const Mobile = (props: any) => <Responsive {...props} maxWidth={600} />;

export const formatCurrency = (value: number) => (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const formatCurrencyTicks = (value: number) => (value).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
