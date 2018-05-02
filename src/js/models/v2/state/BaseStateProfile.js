/**
 * BaseStateProfile.js
 * Created by Lizzie Salita 5/1/18
 */

import CoreRecipient from './CoreRecipient';
import CoreCensusData from './CoreCensusData';

const BaseStateProfile = Object.create(CoreRecipient);

BaseStateProfile.populate = function populate(data) {
    // reformat fields required by CoreRecipient
    const coreData = {
        id: data.fips || null,
        name: data.name,
        awardedAmount: data.total_obligation,
        totalAwards: data.award_count,
        fy: data.fy
    };
    this.populateCore(coreData);

    if (data.details) {
        const censusData = {
            population: data.details.population,
            awardedAmountPerCapita: data.details.awarded_amount_per_capita,
            medianHouseholdIncome: data.details.median_household_income
        };
        const details = Object.create(CoreCensusData);
        details.populateCore(censusData);
        this.details = details;
    }

    this.flag = data.flag_filename || '';
};

export default BaseStateProfile;
