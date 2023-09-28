/**
 * @jest-environment jsdom
 */
import { initialState, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';
import { areFiltersEqual, isSearchHashReady } from 'helpers/searchHelper';

test.each([
    ['obj1 & obj2 are both initial state', true, initialState, initialState],
    ['obj1 is initial state and obj2 has timePeriodFY changed', false, initialState, { ...initialState, timePeriodFY: new Set(['2020']) }],
    ['empty vs defined def codes', false, initialState, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['12'], counts: [], exclude: [] })
    }],
    ['same def codes', true, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['21', '12'], counts: [], exclude: [] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['12', '21'], counts: [], exclude: [] })
    }],
    ['same def codes (w/ 2d array)', true, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['21', '2121'], ['64', '6464']], counts: [], exclude: [] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['64', '6464'], ['21', '2121']], counts: [], exclude: [] })
    }],
    ['different def codes on require', false, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['21'], counts: [], exclude: [] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['22'], counts: [], exclude: [] })
    }],
    ['different def codes on require (w/ 2d array)', false, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['21', '2121']], counts: [], exclude: [] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['22', '2222']], counts: [], exclude: [] })
    }],
    ['different def codes on exclude', false, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['21'], counts: [], exclude: ['1'] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: ['21'], counts: [], exclude: ['2'] })
    }],
    ['different def codes on exclude (w/ 2d array)', false, {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['21', '2121']], counts: [], exclude: [['20', '2020']] })
    },
    {
        ...initialState,
        defCodes: CheckboxTreeSelections({ require: [['21', '2121']], counts: [], exclude: [['19', '1919']] })
    }]
])('%s, returns %s', (str, rtrn, obj1, obj2) => {
    expect(areFiltersEqual(obj1, obj2)).toEqual(rtrn);
});

test.each([
    ['', false],
    ['/?', false],
    ['/?fy=2020&period=12&hash=', false],
    ['/?fy=2020&period=12&hash=t', true]
])('when input (a query param) is %s return value is %s', (input, rtrn) => {
    expect(isSearchHashReady({ search: input })).toEqual(rtrn);
});

