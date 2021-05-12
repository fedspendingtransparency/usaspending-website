import { apiRequest } from '../helpers/apiRequest';

export const fetchDataDictionary = () => apiRequest({
    url: 'v2/references/data_dictionary/'
});
