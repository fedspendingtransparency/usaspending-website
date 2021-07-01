/**
 * BaseAgencyRecipients.js
 * Created by Lizzie Salita 7/1/21
 */

import { formatNumber, calculatePercentage } from 'helpers/moneyFormatter';

const BaseAgencyRecipients = {
    populate(data) {
        this._count = data?.count;
        this.count = formatNumber(this._count);
        // eslint-disable-next-line camelcase
        this._federalCount = data?.total_federal_count || 0;
        this.percentOfFederalCount = calculatePercentage(this._count, this._federalCount);
    }
};

export default BaseAgencyRecipients;
