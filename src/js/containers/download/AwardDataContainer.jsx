/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';

import AwardDataContent from 'components/download/AwardDataContent';

const awardLevels = [
    {
        name: 'prime_awards',
        label: 'Prime Awards'
    },
    {
        name: 'sub_awards',
        label: 'Sub Awards'
    }
];

const awardTypes = [
    {
        name: 'contracts',
        label: 'Contracts'
    },
    {
        name: 'grants',
        label: 'Grants'
    },
    {
        name: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        name: 'loans',
        label: 'Loans'
    },
    {
        name: 'other_financial_assistance',
        label: 'Other Financial Assistance'
    }
];

export default class AwardDataContainer extends React.Component {
    render() {
        return (
            <AwardDataContent
                awardLevels={awardLevels}
                awardTypes={awardTypes} />
        );
    }
}

