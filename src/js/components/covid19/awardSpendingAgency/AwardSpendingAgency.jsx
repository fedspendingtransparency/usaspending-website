/**
 * AwardSpending.jsx
 * Created by James Lee 6/18/20
 */

import React from 'react';
import DateNote from 'components/covid19/DateNote';
import MoreOptionsTabs from '../../sharedComponents/moreOptionsTabs/MoreOptionsTabs';
import { awardSpendingAgencyTableTabs } from '../../../dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableTabs';

const AwardSpendingAgency = () => {
    // TODO - Remove hard coded values
    const fy = 2020;
    const dateString = "June 30, 2020";

    const mockCounts = {
        all: 123123123,
        contracts: 2856942,
        idvs: 65718,
        grants: 262180,
        direct_payments: 3173522,
        loans: 955562,
        insurance: 123,
        otherOption: 123123,
        otherOption1: 123123123,
        otherOption2: 123123123123
    };


    return (
        <div className="body__content award-spending">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">This is how the <strong>total spending</strong> of the COVID-19 Response was categorized.</h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>
            <MoreOptionsTabs tabs={awardSpendingAgencyTableTabs} tabCounts={mockCounts} />
            <div className="award-spending__content" />
        </div>
    );
};

export default AwardSpendingAgency;
