/**
 * BaseAgencyBudgetaryResources.js
 * Created by Lizzie Salita 5/26/20
 */

const BaseAgencyBudgetaryResources = {
    populate(data) {
        // eslint-disable-next-line camelcase
        this.dataByYear = data?.agency_data_by_year.reduce((acc, obj) => ({
            ...acc,
            [obj.fiscal_year]: {
                agencyBudget: obj.agency_budgetary_resources || 0,
                agencyObligated: obj.agency_total_obligated || 0,
                federalBudget: obj.total_budgetary_resources || 0,
                obligationsByPeriod: obj.agency_obligation_by_period || []
            }
        }), {}) || {};
    }
};

export default BaseAgencyBudgetaryResources;
