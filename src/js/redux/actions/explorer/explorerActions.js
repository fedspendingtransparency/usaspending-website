/**
 * explorerActions.js
 * Created by Kevin Li 8/16/17
 */

export const setExplorerRoot = (state) => ({
    type: 'SET_EXPLORER_ROOT',
    root: state
});

export const setExplorerYear = (state) => ({
    type: 'SET_EXPLORER_FY',
    fy: state
});

export const addExplorerFilter = (state) => ({
    type: 'ADD_EXPLORER_FILTER',
    filter: state
});

export const rewindExplorerFilters = (state) => ({
    type: 'REWIND_EXPLORER_FILTERS',
    index: state
});

export const rewindExplorerTrail = (state) => ({
    type: 'REWIND_EXPLORER_TRAIL',
    index: state
});

export const resetExplorer = () => ({
    type: 'RESET_EXPLORER'
});
