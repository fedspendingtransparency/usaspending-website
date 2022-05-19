/**
 * BaseAgencySubcomponentsList.js
 * Created by Afna Saifudeen 12/14/21
 */
import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const BaseAgencySubcomponentsList = {
    populate(data) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        /* eslint-disable camelcase */
        this._budgetaryResources = data?.total_budgetary_resources || 0;
        this._obligations = data?.total_obligations || 0;
        this._outlays = data?.total_outlays || 0;
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
