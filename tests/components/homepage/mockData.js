import HomepageStateModel from 'models/homepage/HomepageStateModel';

export const mockMap = {
    states: {
        children: [
            {
                StateName: "State 1",
                StateAbbrev: "S1",
                TotalAmount: 1234,
                TotalRank: 1,
                TotalStatePopulation: 15,
                PerCapitaAmount: 82,
                PerCapitaRank: 2
            },
            {
                StateName: "State 2",
                StateAbbrev: "S2",
                TotalAmount: 500,
                TotalRank: 2,
                TotalStatePopulation: 20,
                PerCapitaAmount: 25,
                PerCapitaRank: 3
            },
            {
                StateName: "State 3",
                StateAbbrev: "S3",
                TotalAmount: 400,
                TotalRank: 3,
                TotalStatePopulation: 2,
                PerCapitaAmount: 200,
                PerCapitaRank: 1
            }
        ]
    }
};

export const mockProps = {
    mapData: {
        capita: {
            populations: [15, 20, 2],
            ranks: [2, 3, 1],
            states: ['S1', 'S2', 'S3'],
            values: [82, 25, 200]
        },
        total: {
            states: ['S1', 'S2', 'S3'],
            values: [1234, 500, 400],
            total: 2134
        },
        table: [
            new HomepageStateModel(mockMap.states.children[0]),
            new HomepageStateModel(mockMap.states.children[1]),
            new HomepageStateModel(mockMap.states.children[2])
        ]
    }
};
