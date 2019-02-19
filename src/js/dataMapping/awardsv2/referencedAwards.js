/**
 * referencedAwards.js
 * Created by Lizzie Salita on 2/19/19.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files

export const referencedAwardsColumns = {
    idvs: [
        {
            label: 'Award ID',
            field: 'piid'
        },
        {
            label: 'Contracting Agency',
            field: 'funding_agency'
        },
        {
            label: 'Award Type',
            field: 'award_type'
        },
        {
            label: 'Combined Obligated Amount',
            field: 'obligated_amount'
        },
        {
            label: 'Start Date',
            field: 'period_of_performance_start_date'
        },
        {
            label: 'Last Date to Order',
            field: 'last_date_to_order'
        },
        {
            label: 'Description',
            field: 'description'
        }
    ],
    contracts: [
        {
            label: 'Award ID',
            field: 'piid'
        },
        {
            label: 'Contracting Agency',
            field: 'funding_agency'
        },
        {
            label: 'Award Type',
            field: 'award_type'
        },
        {
            label: 'Obligated Amount',
            field: 'obligated_amount'
        },
        {
            label: 'Start Date',
            field: 'period_of_performance_start_date'
        },
        {
            label: 'End Date',
            field: 'period_of_performance_current_end_date'
        },
        {
            label: 'Description',
            field: 'description'
        }
    ]
};

/* eslint-enable import/prefer-default-export */
