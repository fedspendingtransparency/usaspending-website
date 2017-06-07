/**
 * mapTable.js
 * Created by Kevin Li 5/22/17
 */

export const tableColumns = {
    order: [
        'state',
        'amount',
        'amountRank',
        'capita',
        'capitaRank'
    ],
    labels: {
        state: 'State',
        amount: 'Total Amount',
        amountRank: 'Total Rank',
        capita: 'Per Capita Amount',
        capitaRank: 'Per Capita Rank'
    },
    widths: {
        state: 200,
        amount: 200,
        amountRank: 175,
        capita: 250,
        capitaRank: 200
    },
    defaultDirection: {
        state: 'asc',
        amount: 'desc',
        amountRank: 'asc',
        capita: 'desc',
        capitaRank: 'asc'
    }
};
