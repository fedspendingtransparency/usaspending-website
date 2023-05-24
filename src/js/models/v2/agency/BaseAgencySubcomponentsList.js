/**
 * BaseAgencySubcomponentsList.js
 * Created by Afna Saifudeen 12/14/21
 */

import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const BaseAgencySubcomponentsList = {
    populate(data, id) {
        this.id = id || data?.id || data?.code || '';
        this.name = data?.name ? data.name : '';
        /* eslint-disable camelcase */
        this._budgetaryResources = data?.total_budgetary_resources || data?.budgetary_resources_amount || 0;
        this._obligations = data?.total_obligations || data?.obligated_amount || 0;
        this._outlays = data?.total_outlays || data?.gross_outlay_amount || 0;
    },
    get budgetaryResources() {
        return formatMoneyWithUnitsShortLabel(this._budgetaryResources, 2);
    },
    get obligations() {
        return formatMoneyWithUnitsShortLabel(this._obligations, 2);
    },
    get outlays() {
        return formatMoneyWithUnitsShortLabel(this._outlays, 2);
    }
};

export default BaseAgencySubcomponentsList;
