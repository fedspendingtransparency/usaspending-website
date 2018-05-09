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
        totalAmount: data.total_prime_amount,
        totalAwards: data.total_prime_awards
    };
    this.populateCore(coreData);

    this.type = data.state_type || '';
    this.populationSourceYear = (data.pop_year && `${data.pop_year}`) || '';
    this.incomeSourceYear = (data.mhi_year && `${data.mhi_year}`) || '';
    this._population = data.population || 0;
    this._awardAmountPerCapita = data.award_amount_per_capita || 0;
    this._medianHouseholdIncome = data.median_household_income || 0;
};

// getter functions
Object.defineProperty(BaseStateProfile, 'population', {
    get() {
        if (this._population === 0) {
            return '--';
        }
        return formatNumberWithPrecision(this._population, 0);
    }
});
Object.defineProperty(BaseStateProfile, 'awardAmountPerCapita', {
    get() {
        if (this._awardAmountPerCapita === 0) {
            return '--';
        }
        return formatMoney(this._awardAmountPerCapita);
    }
});
Object.defineProperty(BaseStateProfile, 'medianHouseholdIncome', {
    get() {
        if (this._medianHouseholdIncome === 0) {
            return '--';
        }
        return formatMoney(this._medianHouseholdIncome);
    }
});
Object.defineProperty(BaseStateProfile, 'flag', {
    // TODO - Lizzie: update to url when files are moved to S3
    get() {
        if (this.id < 10) {
            return `0${this.id}.png`;
        }
        return `${this.id}.png`;
    }
});

export default BaseStateProfile;
