/**
 * BaseIdvActivityBar.js
 * Created by Lizzie Salita 5/13/19
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import { parseDate, formatDate } from './CorePeriodOfPerformance';

const BaseIdvActivityBar = {
    populate(data) {
        this.id = (data.award_id && `${data.award_id}`) || '';
        this.generatedId = data.generated_unique_award_id || '';
        this.awardingAgencyName = data.awarding_agency_name || '';
        this.awardingAgencyId = (data.awarding_agency_id && `${data.awarding_agency_id}`) || '';
        this._endDate = (data.last_date_to_order && parseDate(data.last_date_to_order)) || '';
        this._awardedAmount = data.awarded_amount || 0;
        this._obligatedAmount = data.obligated_amount || 0;
        this._startDate = (data.period_of_performance_start_date && parseDate(data.period_of_performance_start_date)) || null;
        this.piid = data.piid || '';
        this.recipientName = data.recipient_name || '';
        this.recipientId = data.recipient_id || '';
        this.grandchild = data.grandchild;
    },
    get awardedAmount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._awardedAmount, 2);
    },
    get startDate() {
        return this._startDate && formatDate(this._startDate);
    },
    get endDate() {
        return this._endDate && formatDate(this._endDate);
    }
};

export default BaseIdvActivityBar;
