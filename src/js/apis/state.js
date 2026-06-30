import { apiRequest } from '../helpers/apiRequest';

export const fetchStateOverview = (id, year) => apiRequest({
    url: `v2/recipient/state/${id}/`,
    params: { year }
});

export const fetchAwardBreakdown = (id, year) => apiRequest({
    url: `v2/recipient/state/awards/${id}/`,
    params: { year }
});

export const fetchStateList = () => apiRequest({
    url: 'v2/recipient/state/'
});
