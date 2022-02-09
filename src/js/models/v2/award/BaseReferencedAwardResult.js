/**
 * BaseReferencedAwardResult.js
 * Created by Lizzie Salita 2/20/19
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { parseDate } from '../utils';

const BaseReferencedAwardResult = {
    populate(data) {
        this.id = data.award_id || '';
        this.internalId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '';
        this.piid = data.piid || '';
        this.awardType = data.award_type || '';
        this.awardingAgency = data.awarding_agency || '';
        this.awardingAgencyId = data.awarding_agency_id || '';
        this.awardingAgencySlug = data.awarding_agency_slug;
        this._description = data.description || '';
        this.agency = data.funding_agency || '';
        this.agencyId = data.funding_agency_id || '';
        this.agencySlug = data.agency_slug;
        this._obligatedAmount = data.obligated_amount || 0;
        this._lastDateToOrder = parseDate(data.last_date_to_order || null);
        this._endDate = parseDate(data.period_of_performance_current_end_date || null);
        this._startDate = parseDate(data.period_of_performance_start_date || null);
    },
    get startDate() {
        if (!this._startDate) {
            return '';
        }
        return this._startDate.format('MM/DD/YYYY');
    },
    get endDate() {
        if (!this._endDate) {
            return '';
        }
        return this._endDate.format('MM/DD/YYYY');
    },
    get lastDateToOrder() {
        if (!this._lastDateToOrder) {
            return '';
        }
        return this._lastDateToOrder.format('MM/DD/YYYY');
    },
    get obligatedAmount() {
        return formatMoney(this._obligatedAmount);
    },
    get description() {
        const maxChars = 200;
        if (this._description.length > maxChars) {
            return `${this._description.substring(0, maxChars)}...`;
        }
        return this._description;
    }
};

export default BaseReferencedAwardResult;
