/**
 * BaseAgencyRecipients.js
 * Created by Lizzie Salita 7/1/21
 */

import { formatNumber, calculatePercentage } from 'helpers/moneyFormatter';

const BaseAgencyRecipients = {
    populate(data) {
        this._numberOfRecipients = data?.count;
        this.numberOfRecipients = typeof this._numberOfRecipients === 'number' ? formatNumber(this._numberOfRecipients) : '--';
        // eslint-disable-next-line camelcase
        this._numberOfFederalRecipients = data?.total_federal_count || 0;
        this.percentOfFederalRecipients = calculatePercentage(this._numberOfRecipients, this._numberOfFederalRecipients);
        this.maxRecipients = data?.max;
        this.minRecipients = data?.min;
        this.pct25 = data?.["25th_percentile"];
        this.pct50 = data?.["50th_percentile"];
        this.pct75 = data?.["75th_percentile"];
    }
};

export default BaseAgencyRecipients;
