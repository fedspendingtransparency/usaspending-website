/**
 * BaseStateProfile.js
 * Created by Lizzie Salita 5/1/18
 */

import { formatNumberWithPrecision, formatMoney } from 'helpers/moneyFormatter';
import CoreRecipient from './CoreRecipient';

const BaseStateProfile = Object.create(CoreRecipient);

BaseStateProfile.populate = function populate(data) {
    // reformat fields required by CoreRecipient
    const coreData = {
        name: data.name,
        id: data.fips || null,
        totalAmount: data.total_amount,
        totalAwards: data.total_awards,
        fy: data.year
    };
    this.populateCore(coreData);

    this.flag = data.icon_filename || '';
    this._population = data.population;
    this._awardAmountPerCapita = data.award_amount_per_capita;
    this._medianHouseholdIncome = data.median_household_income;
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

export default BaseStateProfile;
