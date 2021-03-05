import { useLocation } from 'react-router-dom';

export const useQueryParams = () => Object.fromEntries(new URLSearchParams(useLocation().search));

export const combineQueryParams = (existingParams, newParams) => Object
    .entries(newParams)
    .filter(([, value]) => value !== '' && value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), existingParams);

export const getQueryParamString = (obj) => `?${new URLSearchParams(obj).toString()}`;
