/**
 * BaseAgencyRow.js
 * Created by Lizzie Salita 11/20/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';
import moment from 'moment';

const addFuturePeriods = (periods) => {
    if (periods.length === 12) return periods;
    return periods
        .concat(
            new Array(12 - periods.length)
                .fill()
                .map(() => ({
                    quarterly: false,
                    submission_dates: { certification_date: '--', publication_date: '--' }
                }))
        );
};

const DatesRow = {
    populate(fy, data, totals) {
        this._name = data.agency_name || '';
        this._abbreviation = data.abbreviation || '';
        this._code = data.code || '';
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._federalTotal = totals
            .filter(({ fiscal_year: y }) => y === fy)
            .reduce((acc, { total_budgetary_resources: t }) => acc + t, 0);
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
        if (this._federalTotal) {
            return `${((this._budgetAuthority / this._federalTotal) * 100).toFixed(2)}%`;
        }
        return "N/A for Time (try 2020)";
    }
};

export default DatesRow;
