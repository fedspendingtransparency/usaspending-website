/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

const mockStateData = {
    // TODO - Lizzie: remove mock data
    results: {
        fips: '1',
        name: 'California',
        flag_filename: 'CA.jpg',
        fy: 'all',
        total_obligation: 300200000000,
        award_count: 327721,
        details: {
            population: 39536653,
            awarded_amount_per_capita: 7953,
            median_household_income: 63636
        },
        breakdown: {
            direct_payments: {
                amount: 139000000000,
                count: 16411
            },
            grants: {
                amount: 100920000000,
                count: 31188
            },
            contracts: {
                amount: 53920000000,
                count: 254549
            },
            other: {
                amount: 6110000000,
                count: 4619
            },
            loans: {
                amount: 24164000000,
                count: 16411
            }
        }
    }
};

export const fetchStateOverview = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockStateData
                });
            });
        })
    }
);
