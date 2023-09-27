/**
 * @jest-environment jsdom
 */
import { List, Map } from 'immutable';

const tableType = {
    visibleOrder: new List(['First Column', 'Second Column']),
    hiddenOrder: new List(['Third Column', 'Fourth Column']),
    data: new Map({
        'First Column': {
            columnName: 'First Column',
            displayName: 'First Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Second Column': {
            columnName: 'Second Column',
            displayName: 'Second Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Third Column': {
            columnName: 'Third Column',
            displayName: 'Third Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Fourth Column': {
            columnName: 'Fourth Column',
            displayName: 'Fourth Column',
            width: 220,
            defaultDirection: 'desc'
        }
    })
};

export const mutableVersion = {
    visibleOrder: ['First Column', 'Second Column'],
    hiddenOrder: ['Third Column', 'Fourth Column'],
    data: {
        'First Column': {
            columnName: 'First Column',
            displayName: 'First Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Second Column': {
            columnName: 'Second Column',
            displayName: 'Second Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Third Column': {
            columnName: 'Third Column',
            displayName: 'Third Column',
            width: 220,
            defaultDirection: 'desc'
        },
        'Fourth Column': {
            columnName: 'Fourth Column',
            displayName: 'Fourth Column',
            width: 220,
            defaultDirection: 'desc'
        }
    }
};

export const mockColumns = {
    contracts: tableType,
    grants: tableType,
    direct_payments: tableType,
    loans: tableType,
    other: tableType
};
