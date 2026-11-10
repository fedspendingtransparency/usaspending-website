import Analytics from "../../../helpers/analytics/Analytics";

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