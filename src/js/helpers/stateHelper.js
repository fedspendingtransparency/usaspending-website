/**
 * stateHelper.js
 * Created by Lizzie Salita 5/1/18
 */

const mockStateData = {
    // TODO - Lizzie: remove mock data
    results: {
        name: 'California',
        fips: 51,
        year: 2017,
        population: 8414380,
        total_amount: 300200000000,
        total_awards: 327721,
        award_amount_per_capita: 916023.08,
        median_household_income: 68114,
        icon_filename: 'CA.jpg'
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
