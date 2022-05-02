/**
 * BaseIdvActivityBar.js
 * Created by Lizzie Salita 5/13/19
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import { parseDate, formatDate } from './CorePeriodOfPerformance';

const BaseIdvActivityBar = {
    populate(data) {
        this.generatedId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '--';
        this.awardingAgencyName = data.awarding_agency || '--';
        this.parentAwardId = data.parent_award_id || '--';
        this.parentGeneratedId = data.parent_generated_unique_award_id || '--';
        this.parentAwardPIID = data.parent_award_piid || '--';
        this.awardingAgencyId = (data.awarding_agency_id && `${data.awarding_agency_id}`) || '--';
        this.awardingAgencySlug = data.awarding_agency_slug;
        this._endDate = data.period_of_performance_potential_end_date ?
            parseDate(data.period_of_performance_potential_end_date) : null;
        this._awardedAmount = data.awarded_amount || 0;
        this._obligatedAmount = data.obligated_amount || 0;
        this._startDate =
        data.period_of_performance_start_date ?
            parseDate(data.period_of_performance_start_date) : null;
        this.piid = data.piid || '--';
        this.recipientName = data.recipient_name || '--';
        this.recipientId = data.recipient_id || '--';
        this.grandchild = data.grandchild;
    },
    get awardedAmount() {
        const units = MoneyFormatter.calculateUnitForSingleValue(this._awardedAmount, 1);
        return `${MoneyFormatter.formatMoneyWithPrecision((this._awardedAmount / units.unit), 1)}
         ${units.unitLabel}`;
    },
    get obligatedAmount() {
        const units = MoneyFormatter.calculateUnitForSingleValue(this._obligatedAmount, 1);
        return `${MoneyFormatter.formatMoneyWithPrecision((this._obligatedAmount / units.unit), 1)}
         ${units.unitLabel}`;
    },
    get startDate() {
        return this._startDate ? formatDate(this._startDate) : '--';
    },
    get endDate() {
        return this._endDate ? formatDate(this._endDate) : '--';
    }
};

export default BaseIdvActivityBar;
