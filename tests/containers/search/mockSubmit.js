import { initialState as initialApplied } from 'redux/reducers/search/appliedFiltersReducer';
import { initialState as initialStaged } from 'redux/reducers/search/searchFiltersReducer';

export const mockRedux = {
    requestsComplete: true,
    stagedFilters: initialStaged,
    appliedFilters: initialApplied.filters
};

export const mockActions = {
    resetNaicsTree: jest.fn(),
    applyStagedFilters: jest.fn(),
    clearStagedFilters: jest.fn(),
    setAppliedFilterCompletion: jest.fn(),
    resetAppliedFilters: jest.fn(),
    resetMapLegendToggle: jest.fn()
};
