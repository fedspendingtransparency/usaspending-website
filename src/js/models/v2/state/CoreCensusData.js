/**
 * CoreCensusData.js
 * Created by Lizzie Salita 5/2/18
 */

import { formatMoney, formatNumberWithPrecision } from 'helpers/moneyFormatter';

const CoreCensusData = {
    populateCore(data) {
        this._population = parseFloat(data.population) || 0;
        this._awardedAmountPerCapita = parseFloat(data.awardedAmountPerCapita) || 0;
        this._medianHouseholdIncome = parseFloat(data.medianHouseholdIncome) || 0;
    },
    get population() {
        return formatNumberWithPrecision(this._population);
    },
    get awardedAmountPerCapita() {
        return formatMoney(this._awardedAmountPerCapita);
    },
    get medianHouseholdIncome() {
        return formatMoney(this._medianHouseholdIncome);
    }
};

export default CoreCensusData;
