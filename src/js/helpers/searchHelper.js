/**
  * searchHelper.js
  * Created by Kevin Li 11/2/16
  **/

import Axios from 'axios';

import kGlobalConstants from 'GlobalConstants';

export const performSearch = (searchParams) =>
    Axios.request({
        url: 'awards/summary/',
        baseURL: kGlobalConstants.API,
        method: 'post',
        data: searchParams
    });

// convenience function for performing paged searches
export const performPagedSearch = (filters = [], page = 1, limit = 30) =>
    performSearch({ filters, page, limit });
