import Analytics from "../../../helpers/analytics/Analytics";
import { uniqueFilterFields } from "./searchAnalytics";

const setSearchOrigin = (isNLSearchActive) => isNLSearchActive ? "Smart Assist" : "Advanced Search";

export const searchSectionWrapper = (sectionName, selectedDropdownOption, viewType, hash, isNLSearchActive) => {
    Analytics.event({
        category: `Section ${sectionName}: ${selectedDropdownOption}`,
        action: `Viewed ${selectedDropdownOption} ${viewType}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive)
    });
};


export const sectionDSMEvent = (action, prefix, isNLSearchActive) => {
    Analytics.event({
        category: 'Advanced Search - Results View DSM',
        action,
        label: `${prefix} DS&M`,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logCategorySelectionEvent = (linkName, selectedDropdown, isNLSearchActive) => {
    Analytics.event({
        category: `Section categories: ${selectedDropdown}`,
        action: `Clicked ${linkName}`,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logSectionCategoriesFromChartEvent = (linkName, scope, hash, isNLSearchActive) => {
    Analytics.event({
        category: `Section categories: ${scope}`,
        action: `Clicked ${linkName}`,
        label: hash,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const         Analytics.event({
    category: 'Section Categories',
    action: `View ${e}`,
    label: hash,

});

export const logMapLayerEvent = (layer, isNLSearchActive) => {
    Analytics.event({
        event: 'search_map_layer_event',
        category: 'Advanced Search - Map - Map Layer',
        action: layer,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logMapScopeEvent = (scope, isNLSearchActive) => {
    Analytics.event({
        event: 'search_map_location_type_event',
        category: 'Advanced Search - Map - Location Type',
        action: scope,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logResultsTable = (tab, isNLSearchActive) => {
    Analytics.event({
        event: 'search_table_tab',
        category: 'Advanced Search - Table Tab',
        action: tab,
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
    });
};

export const logAwardIdClickEvent = (id, location, isNLSearchActive) => {
    Analytics.event({
        event: 'search_award_click',
        category: 'Advanced Search - Spending by Prime Award',
        action: `Clicked ${id}`,
        label: new URLSearchParams(location.search).get('hash'),
        gtm: true,
        method: setSearchOrigin(isNLSearchActive)
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
}

export const toggleFilterAccordion = (isOpen, title, isSearchActive) => {
    Analytics.event({
        event: 'dap_event',
        category: 'Advanced Search - Filter',
        action: isOpen ? 'Filter Open' : 'Filter Close',
        label: title.concat(' ', isOpen ? 'open' : 'close')
    });
}

