export const mockData = {
    data: [
        { name: 'Texas', code: 'TX', fips: '48', amount: 700, type: 'state' },
        { name: 'Alabama', code: 'AL', fips: '01', amount: 300, type: 'state' },
        { name: 'Puerto Rico', code: 'PR', fips: '72', amount: 200, type: 'territory' },
        { name: 'District of Columbia', code: 'DC', fips: '11', amount: 100, type: 'district' }
    ]
};

export const mockTotal = mockData.data.reduce((sum, state) => sum + state.amount, 0);
