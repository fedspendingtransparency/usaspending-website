/**
 * BaseStateProfile.js
 * Created by Lizzie Salita 5/1/18
 */

import { formatNumberWithPrecision, formatMoney, formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';
import CoreRecipient from './CoreRecipient';

const BaseStateProfile = Object.create(CoreRecipient);

BaseStateProfile.populate = function populate(data) {
    // reformat fields required by CoreRecipient
    const coreData = {
        name: data.name,
        id: data.fips || null,
        totalPrimeAmount: data.total_prime_amount,
        totalPrimeAwards: data.total_prime_awards,
        fy: data.year
    };
    this.populateCore(coreData);

    this.flag = data.icon_filename || '';
    this.source = data.source || '';
    this._population = data.population || 0;
    this._awardAmountPerCapita = data.award_amount_per_capita || 0;
    this._medianHouseholdIncome = data.median_household_income || 0;
    this._totalSubAmount = data.total_subaward_amount || 0;
    this._totalSubAwards = data.total_sub_awards || 0;
};

// getter functions
Object.defineProperty(BaseStateProfile, 'population', {
    get() {
        return formatNumberWithPrecision(this._population, 0);
    }
});
Object.defineProperty(BaseStateProfile, 'awardAmountPerCapita', {
    get() {
        return formatMoney(this._awardAmountPerCapita);
    }
});
Object.defineProperty(BaseStateProfile, 'medianHouseholdIncome', {
    get() {
        return formatMoney(this._medianHouseholdIncome);
    }
});
Object.defineProperty(BaseStateProfile, 'totalSubAmount', {
    get() {
        const units = calculateUnitForSingleValue(this._totalSubAmount);
        return `${formatMoneyWithPrecision(this._totalSubAmount / units.unit, 1)} ${units.longLabel}`;
    }
});
Object.defineProperty(BaseStateProfile, 'totalSubAwards', {
    get() {
        return formatNumberWithPrecision(this._totalSubAwards, 0);
    }
});

export default BaseStateProfile;
