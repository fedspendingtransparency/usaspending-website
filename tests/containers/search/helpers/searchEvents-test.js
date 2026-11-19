import Analytics from 'helpers/analytics/Analytics';
import * as events from 'containers/search/helpers/searchEvents';

jest.mock('helpers/analytics/Analytics', () => ({
    event: jest.fn()
}));

jest.mock('containers/search/helpers/searchAnalytics', () => ({
    ...jest.requireActual('containers/search/helpers/searchAnalytics'),
    uniqueFilterFields: jest.fn(() => 'Keyword|Time Period')
}));

const ADVANCED = 'Advanced Search';
const SMART = 'Smart Assist';

describe('searchEvents', () => {
    beforeEach(() => {
        Analytics.event.mockClear();
    });

    // [function, args without the trailing NL flag, expected event minus `method`]
    const cases = [
        ['logSectionViewEvent', ['Map', 'Spending', 'table', 'abc'], {
            category: 'Section Map: Spending',
            action: 'Viewed Spending table',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logSectionDSMEvent', ['Open', 'Map', 'abc'], {
            category: 'Advanced Search - Results View DSM',
            action: 'Open',
            label: 'Map DS&M',
            form_id: 'abc'
        }],
        ['logCategorySelectionEvent', ['Agency', 'Awards', 'abc'], {
            category: 'Section categories: Awards',
            action: 'Clicked Agency',
            form_id: 'abc'
        }],
        ['logCategoriesLinkClickEvent', ['Agency', 'Awards', 'abc'], {
            category: 'Section categories: Awards',
            action: 'Clicked Agency',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logCategoriesViewEvent', ['Agency', 'abc'], {
            category: 'Section Categories',
            action: 'View Agency',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logMapLayerChangeEvent', ['county', 'abc'], {
            event: 'search_map_layer_event',
            category: 'Advanced Search - Map - Map Layer',
            action: 'county',
            gtm: true,
            form_id: 'abc'
        }],
        ['logMapScopeEvent', ['place_of_performance', 'abc'], {
            event: 'search_map_location_type_event',
            category: 'Advanced Search - Map - Location Type',
            action: 'place_of_performance',
            gtm: true,
            form_id: 'abc'
        }],
        ['logResultsTableTabChangeEvent', ['loans', 'abc'], {
            event: 'search_table_tab',
            category: 'Advanced Search - Table Tab',
            action: 'loans',
            gtm: true,
            form_id: 'abc'
        }],
        ['logAwardIdClickEvent', ['AWD1', 'xyz'], {
            event: 'search_award_click',
            category: 'Advanced Search - Spending by Prime Award',
            action: 'Clicked AWD1',
            label: 'xyz',
            gtm: true,
            form_id: 'xyz'
        }],
        ['logSubAwardIdClickEvent', ['SUB1', 'abc'], {
            event: 'search_subaward_click',
            category: 'Advanced Search - Link',
            action: 'Subaward ID Clicked',
            label: 'SUB1',
            gtm: true,
            form_id: 'abc'
        }],
        ['logDownloadButtonBarContainerEvent', ['award', {}, 'abc'], {
            event: 'advanced_search_download',
            category: 'Advanced Search - Download',
            action: 'award',
            label: 'Keyword|Time Period',
            gtm: true,
            form_id: 'abc'
        }],
        ['logMapViewEvent', ['county', 'abc'], {
            category: 'Section Map',
            action: 'View county',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logExpandEvent', ['Expand', 'abc'], {
            category: 'Advanced Search - Active Filters',
            action: 'Expand Filters',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logResultsOverTimeEvent', ['monthly', 'abc'], {
            category: 'Section Time',
            action: 'View monthly',
            label: 'abc',
            form_id: 'abc'
        }],
        ['logViewBySubawardsEvent', ['abc'], {
            event: 'search_subaward_dropdown',
            category: 'Advanced Search - Search Fields',
            action: 'Subawards Search',
            gtm: true,
            label: 'abc',
            form_id: 'abc'
        }]
    ];

    describe.each(cases)('%s', (name, args, expected) => {
        it('logs the expected event for Advanced Search', () => {
            events[name](...args, false);

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({ ...expected, method: ADVANCED });
        });

        it('logs the expected event for Smart Assist', () => {
            events[name](...args, true);

            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({ ...expected, method: SMART });
        });
    });

    describe('logToggleFilterAccordionEvent', () => {
        it('logs an open event', () => {
            events.logToggleFilterAccordionEvent(true, 'Location', 'abc', false);

            expect(Analytics.event).toHaveBeenCalledWith({
                event: 'dap_event',
                category: 'Advanced Search - Filter',
                action: 'Filter Open',
                label: 'Location open',
                method: ADVANCED,
                form_id: 'abc'
            });
        });

        it('logs a close event', () => {
            events.logToggleFilterAccordionEvent(false, 'Location', 'abc', true);

            expect(Analytics.event).toHaveBeenCalledWith({
                event: 'dap_event',
                category: 'Advanced Search - Filter',
                action: 'Filter Close',
                label: 'Location close',
                method: SMART,
                form_id: 'abc'
            });
        });
    });

    describe('logVisualizationViewEvent', () => {
        beforeEach(() => jest.useFakeTimers());
        afterEach(() => jest.useRealTimers());

        it('logs the event only after a 15 second delay', () => {
            events.logVisualizationViewEvent('treemap', 'Awards', true);

            jest.advanceTimersByTime(14999);
            expect(Analytics.event).not.toHaveBeenCalled();

            jest.advanceTimersByTime(1);
            expect(Analytics.event).toHaveBeenCalledTimes(1);
            expect(Analytics.event).toHaveBeenCalledWith({
                event: 'search_visualization_type',
                category: 'Advanced Search - Visualization Type',
                action: 'treemap',
                gtm: true,
                label: 'Awards',
                method: SMART,
                form_id: 'Awards'
            });
        });
    });
});
