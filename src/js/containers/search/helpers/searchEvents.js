import Analytics from 'helpers/analytics/Analytics';
import { uniqueFilterFields, setSearchOrigin } from './searchAnalytics';

export const logSectionViewEvent = (sectionName, selectedDropdownOption, viewType, hash, isNLSearchActive) => {
    Analytics.event({
        category: `Section ${sectionName}: ${selectedDropdownOption}`,
        action: `Viewed ${selectedDropdownOption} ${viewType}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logSectionDSMEvent = (action, prefix, hash, isNLSearchActive) => {
    Analytics.event({
        category: 'Advanced Search - Results View DSM',
        action,
        label: `${prefix} DS&M`,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logCategorySelectionEvent = (linkName, selectedDropdown, isNLSearchActive, hash) => {
    Analytics.event({
        category: `Section categories: ${selectedDropdown}`,
        action: `Clicked ${linkName}`,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logCategoriesLinkClickEvent = (linkName, scope, hash, isNLSearchActive) => {
    Analytics.event({
        category: `Section categories: ${scope}`,
        action: `Clicked ${linkName}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logCategoriesViewEvent = (e, hash, isNLSearchActive) => {
    Analytics.event({
        category: 'Section Categories',
        action: `View ${e}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logMapLayerChangeEvent = (layer, isNLSearchActive, hash) => {
    Analytics.event({
        event: 'search_map_layer_event',
        category: 'Advanced Search - Map - Map Layer',
        action: layer,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logMapScopeEvent = (scope, isNLSearchActive, hash) => {
    Analytics.event({
        event: 'search_map_location_type_event',
        category: 'Advanced Search - Map - Location Type',
        action: scope,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logResultsTableTabChangeEvent = (tab, isNLSearchActive, hash) => {
    Analytics.event({
        event: 'search_table_tab',
        category: 'Advanced Search - Table Tab',
        action: tab,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logAwardIdClickEvent = (id, hash, isNLSearchActive) => {
    Analytics.event({
        event: 'search_award_click',
        category: 'Advanced Search - Spending by Prime Award',
        action: `Clicked ${id}`,
        label: hash,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logSubAwardIdClickEvent = (id, isNLSearchActive) => {
    Analytics.event({
        event: 'search_subaward_click',
        category: 'Advanced Search - Link',
        action: 'Subaward ID Clicked',
        label: id,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logDownloadButtonBarContainerEvent = (type, filters, isNLSearchActive) => {
    Analytics.event({
        event: 'advanced_search_download',
        category: 'Advanced Search - Download',
        action: type,
        label: uniqueFilterFields(filters),
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logToggleFilterAccordionEvent = (isOpen, title, isNLSearchActive) => {
    Analytics.event({
        event: 'dap_event',
        category: 'Advanced Search - Filter',
        action: isOpen ? 'Filter Open' : 'Filter Close',
        label: title.concat(' ', isOpen ? 'open' : 'close'),
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logMapViewEvent = (e, hash, isNLSearchActive) => {
    Analytics.event({
        category: 'Section Map',
        action: `View ${e}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logVisualizationViewEvent = (action, label, isNLSearchActive) => window.setTimeout(
    () => Analytics.event({
        event: 'search_visualization_type',
        category: 'Advanced Search - Visualization Type',
        action,
        gtm: true,
        label,
        method: setSearchOrigin(isNLSearchActive)
    }), 15 * 1000);

export const logExpandEvent = (type, isNLSearchActive) => {
    Analytics.event({
        category: 'Advanced Search - Active Filters',
        action: `${type} Filters`,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logResultsOverTimeEvent = (e, hash, isNLSearchActive) => {
    Analytics.event({
        category: 'Section Time',
        action: `View ${e}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive),
        form_id: hash
    });
};

export const logViewBySubawardsEvent = (isNLSearchActive) => {
    Analytics.event({
        event: 'search_subaward_dropdown',
        category: 'Advanced Search - Search Fields',
        action: 'Subawards Search',
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};
