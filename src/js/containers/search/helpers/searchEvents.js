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