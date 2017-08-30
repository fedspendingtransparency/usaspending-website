import { List } from 'immutable';
import { ActiveScreen } from 'redux/reducers/explorer/explorerReducer';

export const mockApiReponse = {
    total: 100,
    end_date: '1984-06-30',
    results: [
        {
            id: 1,
            type: 'agency',
            name: 'First Agency',
            code: 'agency-1',
            amount: 75,
            total: 75
        },
        {
            id: 2,
            type: 'agency',
            name: 'Second Agency',
            code: 'agency-2',
            amount: 15,
            total: 15
        },
        {
            id: 3,
            type: 'agency',
            name: 'Third Agency',
            code: 'agency-3',
            amount: 10,
            total: 10
        }
    ]
};

export const mockReducerRoot = {
    root: 'agency',
    fy: '1984',
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
    type: "agency",
    amount: 10,
    id: 3,
    name: "Third Agency",
    code: "agency_3",
    total: 100,
    percent: 0.0841,
    percentString: "8.4%"
};

export const mockRequest = request = {
    within: 'agency',
    subdivision: 'recipient',
    title: 'Third Agency'
};

export const mockActions = {
    setExplorerRoot: jest.fn(),
    setExplorerYear: jest.fn(),
    setExplorerActive: jest.fn(),
    addExplorerTrail: jest.fn(),
    overwriteExplorerTrail: jest.fn(),
    resetExplorer: jest.fn()
};

