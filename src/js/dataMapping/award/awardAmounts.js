/**
 * awardAmounts.js
 * Created by Lizzie Salita 10/15/18
 */

// TODO - Lizzie: determine/create correct fields

export const contractAmounts = [
    {
        name: 'obligation',
        display: 'Funding Obligated',
        color: '#8ba6ca'
    },
    {
        name: 'subawardTotal',
        display: 'Transaction Obligated',
        color: '#4773aa'
    },
    {
        name: 'remaining',
        display: 'Remaining Funding',
        subtitle: 'against base & exercised options',
        color: '#d6d7d9'
    },
    {
        name: 'remaining',
        display: 'Remaining Funding',
        subtitle: 'against base & all options',
        color: '#f1f1f1'
    },
    {
        name: 'amount',
        display: 'Base & Exercised Options',
        subtitle: 'current awarded amount'
    },
    {
        name: 'amount',
        display: 'Base & All Options',
        subtitle: 'total award value'
    }
];
