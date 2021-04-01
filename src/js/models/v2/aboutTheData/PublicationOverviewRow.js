/**
 * PublicationOverviewRow.js
 */

import { formatMoney, formatNumber, calculatePercentage } from 'helpers/moneyFormatter';
import moment from 'moment';

const addFuturePeriods = (periods) => {
    if (periods.length === 12) return periods;
    return periods
        .concat(
            new Array(11 - periods.length)
                .fill()
                .map(() => ({
                    quarterly: false,
                    submission_dates: { certification_date: '--', publication_date: '--' }
                }))
        );
};

const DatesRow = {
    populate(data, federalTotal) {
        this._name = data.agency_name || '';
        this._abbreviation = data.abbreviation || '';
        this.code = data.toptier_code || '';
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._federalTotal = federalTotal;
        this.periods = addFuturePeriods(data.periods)
            .map(({ submission_dates: { publication_date: p, certification_date: c }, quarterly: isQuarterly }) => {
                if (p === '--') {
                    return {
                        isQuarterly, publicationDate: p, certificationDate: c, showNotCertified: false
                    };
                };
                return {
                    publicationDate: p ? moment(p).format('MM/DD/YYYY') : null,
                    certificationDate: c ? moment(c).format('MM/DD/YYYY') : null,
                    showNotCertified: c ? moment(c).isAfter(moment()) : false,
                    isQuarterly
                };
            });
    },
    get name() {
        return (this._name && this._abbreviation)
            ? `${this._name} (${this._abbreviation})`
            : this._name;
    },
    get budgetAuthority() {
        return formatMoney(this._budgetAuthority);
    },
    get discrepancyCount() {
        return formatNumber(this._discrepancyCount);
    },
    get publicationDate() {
        if (this._publicationDate) return moment(this._publicationDate).format('MM/DD/YYYY');
        return '';
    },
    get total() {
        return formatMoney(this._total);
    },
    get percentageOfTotalFederalBudget() {
        // eslint-disable-next-line camelcase
        return calculatePercentage(this._budgetAuthority, this._federalTotal, "--", 2, { absoluteMin: '< 0.01%' });
    }
};

export default DatesRow;
