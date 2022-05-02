/**
 * agencyReporting.js
 * Created by Jonathan Hill 04/23/21
 */

import { stringify } from 'querystring';
import { apiRequest } from 'helpers/apiRequest';

export const getTotalBudgetaryResources = (fy = '', period = '') => {
    if (fy && period) {
        return apiRequest({
            url: `v2/references/total_budgetary_resources/?${stringify({
                fiscal_period: period,
                fiscal_year: fy
            })}`
        });
    }
    return apiRequest({
        url: `v2/references/total_budgetary_resources/`
    });
};

export const getAgenciesReportingData = (fy, period, sort, order, page, limit, filter = '') => apiRequest({
    url: `v2/reporting/agencies/overview/?${stringify({
        fiscal_year: fy,
        fiscal_period: period,
        page,
        limit,
        order,
        sort,
        filter
    })}`
});

export const getSubmissionPublicationDates = (fy, sort, order, page, limit, searchTerm) => apiRequest({
    url: `v2/reporting/agencies/publish_dates?${stringify({
        fiscal_year: fy,
        page,
        limit,
        order,
        sort,
        filter: searchTerm
    })}`
});

export const fetchPublishDates = (agencyCode, fiscalYear, fiscalPeriod, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/${fiscalYear}/${fiscalPeriod}/submission_history/?${stringify(params)}`
});

export const fetchMissingAccountBalances = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/discrepancies/?${stringify(params)}`
});

export const fetchReportingDifferences = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/differences/?${stringify(params)}`
});

export const fetchAgency = (agencyCode, params) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/overview/?${stringify(params)}`
});

export const fetchUnlinkedData = (
    agencyCode,
    fiscalYear,
    fiscalPeriod,
    type
) => apiRequest({
    url: `v2/reporting/agencies/${agencyCode}/${fiscalYear}/${fiscalPeriod}/unlinked_awards/${type}/`
});
