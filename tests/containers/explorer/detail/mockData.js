import { List } from 'immutable';
import { ActiveScreen } from 'redux/reducers/explorer/explorerReducer';

import { decodedAwardId } from "../../../mockData";

export const mockApiResponse = {
    total: 100,
    end_date: '1984-06-30',
    results: [
        {
            id: '1',
            type: 'agency',
            name: 'First Agency',
            code: 'agency-1',
            amount: 75,
            total: 75
        },
        {
            id: '2',
            type: 'agency',
            name: 'Second Agency',
            code: 'agency-2',
            amount: 15,
            total: 15
        },
        {
            id: '3',
            type: 'agency',
            name: 'Third Agency',
            code: 'agency-3',
            amount: 10,
            total: 10
        }
    ]
};

export const mockAwardResponse = {
    total: 1000,
    results: new Array(501).fill().map((e, i) => {
        return {
            id: String(i),
            type: 'award',
            name: 'Award '.concat(String(i)),
            code: '123',
            amount: 1,
            total: 1
        };
    })
};

export const mockReducerRoot = {
    root: 'agency',
    fy: '1984',
    quarter: '4',
    period: null,
    active: new ActiveScreen({
        within: 'root',
        subdivision: 'agency',
        total: 100
    }),
    trail: new List([
        {
            within: 'root',
            subdivision: 'agency',
            total: 100,
            title: ''
        }
    ])
};

export const mockReducerChild = {
    root: 'agency',
    fy: '1984',
    active: new ActiveScreen({
        within: 'agency',
        subdivision: 'federal_account',
        total: 100
    }),
    trail: new List([
        {
            within: 'root',
            subdivision: 'agency',
            total: 100,
            title: ''
        },
        {
            within: 'agency',
            subdivision: 'federal_account',
            total: 75,
            title: 'First Agency'
        }
    ])
};

export const mockLevelData = {
    type: 'agency',
    amount: 10,
    id: '3',
    name: 'Third Agency',
    code: 'agency_3',
    total: 100,
    percent: 0.0841,
    percentString: '8.4%'
};

export const mockDeeperRoot = {
    root: 'agency',
    fy: '1984',
    quarter: '2',
    period: null,
    active: new ActiveScreen({
        within: 'federal_account',
        subdivision: 'award',
        total: 100
    }),
    trail: new List([
        {
            within: 'root',
            subdivision: 'budget_function',
            total: 100,
            title: ''
        },
        {
            within: 'budget_function',
            subdivision: 'budget_subfunction',
            total: 75,
            title: 'Health'
        },
        {
            within: 'budget_subfunction',
            subdivision: 'federal_account',
            title: 'Health care services',
            total: 60
        }
    ])
};

export const mockActiveScreen = new ActiveScreen (
    {'subdivision': 'agency', 'total': 100, 'within': 'root'}
);

export const mockTable = {
    order: {
        field: 'sort_field',
        direction: 'desc'
    },
    pageNumber: 3
};

export const mockParsedResults = [
    {
        'display': {
            'name': 'First Agency',
            'obligated_amount': '$75',
            'percent_of_total': '75.00%'
        },
        'id': '1',
        'name': 'First Agency',
        'obligated_amount': 75,
        'percent_of_total': 0.75
    }, {
        'display': {
            'name': 'Second Agency',
            'obligated_amount': '$15',
            'percent_of_total': '15.00%'
        },
        'id': '2',
        'name': 'Second Agency',
        'obligated_amount': 15,
        'percent_of_total': 0.15
    }, {
        'display': {
            'name': 'Third Agency',
            'obligated_amount': '$10',
            'percent_of_total': '10.00%'
        },
        'id': '3',
        'name': 'Third Agency',
        'obligated_amount': 10,
        'percent_of_total': 0.1
    }
];

export const mockPager = {
    totalItems: 3,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
    startPage: 1,
    endPage: 1,
    startIndex: 0,
    endIndex: 2,
    pages: [1],
    prevEllipses: '',
    nextEllipses: '',
    firstButton: '',
    lastButton: ''
};

export const mockActions = {
    setExplorerRoot: jest.fn(),
    setExplorerPeriod: jest.fn(),
    setExplorerActive: jest.fn(),
    addExplorerTrail: jest.fn(),
    overwriteExplorerTrail: jest.fn(),
    setExplorerTableOrder: jest.fn(),
    setExplorerTablePage: jest.fn(),
    resetExplorerTable: jest.fn(),
    resetExplorer: jest.fn(),
    history: {
        push: jest.fn()
    }
};

