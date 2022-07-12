/**
 * referencedAwards.js
 * Created by Lizzie Salita on 2/19/19.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files

export const referencedAwardsColumns = {
    child_idvs: [
        {
            name: 'piid',
            label: 'Award ID',
            field: 'piid'
        },
        {
            name: 'awardingAgency',
            label: 'Awarding Agency',
            field: 'awarding_agency'
        },
        {
            name: 'awardType',
            label: 'Award Type',
            field: 'award_type'
        },
        {
            name: 'obligatedAmount',
            label: 'Combined Obligated Amount',
            field: 'obligated_amount'
        },
        {
            name: 'startDate',
            label: 'Start Date',
            field: 'period_of_performance_start_date'
        },
        {
            name: 'lastDateToOrder',
            label: 'Ordering Period End Date',
            field: 'last_date_to_order'
        },
        {
            name: 'description',
            label: 'Description',
            field: 'description'
        }
    ],
    child_awards: [
        {
            name: 'piid',
            label: 'Award ID',
            field: 'piid'
        },
        {
            name: 'awardingAgency',
            label: 'Awarding Agency',
            field: 'awarding_agency'
        },
        {
            name: 'awardType',
            label: 'Award Type',
            field: 'award_type'
        },
        {
            name: 'obligatedAmount',
            label: 'Obligated Amount',
            field: 'obligated_amount'
        },
        {
            name: 'startDate',
            label: 'Start Date',
            field: 'period_of_performance_start_date'
        },
        {
            name: 'endDate',
            label: 'End Date',
            field: 'period_of_performance_current_end_date'
        },
        {
            name: 'description',
            label: 'Base Transaction Description',
            field: 'description'
        }
    ],
    grandchild_awards: [
        {
            name: 'piid',
            label: 'Award ID',
            field: 'piid'
        },
        {
            name: 'awardingAgency',
            label: 'Awarding Agency',
            field: 'awarding_agency'
        },
        {
            name: 'awardType',
            label: 'Award Type',
            field: 'award_type'
        },
        {
            name: 'obligatedAmount',
            label: 'Obligated Amount',
            field: 'obligated_amount'
        },
        {
            name: 'startDate',
            label: 'Start Date',
            field: 'period_of_performance_start_date'
        },
        {
            name: 'endDate',
            label: 'End Date',
            field: 'period_of_performance_current_end_date'
        },
        {
            name: 'description',
            label: 'Description',
            field: 'description'
        }
    ]
};

/* eslint-enable import/prefer-default-export */
