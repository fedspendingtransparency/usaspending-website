/**
 * BaseFederalAccount.js
 * Created by Jonathan Hill 04/25/19
 */

import { formatMoney } from 'helpers/moneyFormatter';

export default class BaseFederalAccount {
    constructor(data, total) {
        this._federalAccountName = data.account_title || '';
        this._obligatedAmount = data.total_transaction_obligated_amount || 0;
        this._federalAccount = data.federal_account || '';
        this._percent = (data.total_transaction_obligated_amount / total) * 100;
        this._fundingAgencyName = data.funding_agency_name || '';
        this._fundingAgencyAbbreviation = data.funding_agency_abbreviation || '';
        this._fundingAgencyId = data.funding_agency_id || '';
        this._fundingAgencySlug = data.funding_agency_slug || '';
        this._total = total || 0;

        Object.defineProperties(this, {
            federalAccountName: {
                enumerable: true,
                get: () => {
                    const maxChars = 36;
                    const upperName = this._federalAccountName.toUpperCase();
                    if (upperName.length <= maxChars) return upperName;
                    const truncated = upperName.substring(0, 36);
                    return `${truncated}...`;
                }
            },
            obligatedAmount: {
                enumerable: true,
                get: () => formatMoney(this._obligatedAmount)
            },
            federalAccount: {
                enumerable: true,
                get: () => this._federalAccount || ''
            },
            percent: {
                enumerable: true,
                get: () => {
                    if (this._obligatedAmount < 0) return 'N/A';
                    if (this._obligatedAmount === 0) return '0%';
                    const decimal = this._percent.toFixed(2);
                    if (decimal === '0.00') return 'Less than 0.01%';
                    if (decimal[0] !== '0') {
                        const end = decimal.length - 3;
                        return `${decimal.slice(0, end)}%`;
                    }
                    return `${decimal}%`;
                }
            },
            fundingAgencyName: {
                enumerable: true,
                get: () => {
                    const maxChars = 36;
                    const upperName = this._fundingAgencyName.toUpperCase();
                    if (upperName.length <= maxChars) return upperName;
                    const truncated = upperName.substring(0, 36);
                    return `${truncated}...`;
                }
            },
            fundingAgencyAbbreviation: {
                enumerable: true,
                get: () => this._fundingAgencyAbbreviation || ''
            },
            fundingAgencySlug: {
                enumerable: true,
                get: () => this._fundingAgencySlug || ''
            }
        });
    }
}
