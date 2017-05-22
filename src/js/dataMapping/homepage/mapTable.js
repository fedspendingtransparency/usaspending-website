/**
 * mapTable.js
 * Created by Kevin Li 5/22/17
 */

export const tableColumns = {
    order: [
        'state',
        'amt',
        'amtRank',
        'capAmt',
        'capRank'
    ],
    labels: {
        state: 'State',
        amt: 'Total Amount',
        amtRank: 'Total Rank',
        capAmt: 'Per Capita Amount',
        capRank: 'Per Capita Rank'
    },
    widths: {
        state: 200,
        amt: 200,
        amtRank: 175,
        capAmt: 250,
        capRank: 200
    },
    defaultDirection: {
        state: 'asc',
        amt: 'desc',
        amtRank: 'asc',
        capAmt: 'desc',
        capRank: 'asc'
    }
};
