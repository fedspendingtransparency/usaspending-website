/**
 * explorerActions.js
 * Created by Kevin Li 8/16/17
 */

export const setExplorerRoot = (state) => ({
    type: 'SET_EXPLORER_ROOT',
    root: state
});

export const setExplorerPeriod = (state) => ({
    type: 'SET_EXPLORER_TIME_PERIOD',
    fy: state.fy,
    quarter: state.quarter,
    period: state.period
});

export const setExplorerActive = (state) => ({
    type: 'SET_EXPLORER_ACTIVE',
    active: state
});

export const addExplorerTrail = (state) => ({
    type: 'ADD_EXPLORER_TRAIL',
    item: state
});

export const overwriteExplorerTrail = (state) => ({
    type: 'OVERWRITE_EXPLORER_TRAIL',
    trail: state
});

export const setExplorerTableOrder = (state) => ({
    type: 'SET_EXPLORER_TABLE_ORDER',
    order: state
});

export const setExplorerTablePage = (state) => ({
    type: 'SET_EXPLORER_TABLE_PAGE',
    number: state
});

export const resetExplorerTable = () => ({
    type: 'RESET_EXPLORER_TABLE'
});

export const resetExplorer = () => ({
    type: 'RESET_EXPLORER'
});
