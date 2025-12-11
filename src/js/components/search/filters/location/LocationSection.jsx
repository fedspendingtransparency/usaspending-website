/**
 * LocationSection.jsx
 * Created by Kevin Li 11/1/17
 */

import React, { useState } from 'react';
import { useSelector } from "react-redux";

import FilterTabs from "../../../sharedComponents/filterSidebar/FilterTabs";
import LocationAutocompleteContainer from
    "../../../../containers/search/filters/location/LocationAutocompleteContainer";

const tabLabels = [
    {
        internal: 'pop',
        label: 'Place of Performance',
        title: 'Place of Performance'
    },
    {
        internal: 'recipient',
        label: 'Recipient Location',
        title: 'Recipient Location'
    }
];

const LocationSection = () => {
    const { selectedLocations, selectedRecipientLocations } = useSelector((state) => state.filters);
    const initialTab = selectedRecipientLocations?.count() > 0 && selectedLocations.count() === 0 ?
        'recipient' : 'pop';
    const [activeTab, setActiveTab] = useState(initialTab);

    const toggleTab = (e) => {
        if (
            (activeTab === 'recipient' && e.target.textContent !== 'Recipient Location') ||
            (activeTab === 'pop' && e.target.textContent !== 'Place of Performance')
        ) {
            setActiveTab(activeTab === 'pop' ? 'recipient' : 'pop');
        }
    };

    return (
        <div className="filter-item-wrap location-filter search-filter">
            <div className="location-description">
                Search for a country, state, county, city, congressional district, or zip code
            </div>
            <FilterTabs
                labels={tabLabels}
                switchTab={toggleTab}
                active={activeTab} />
            <LocationAutocompleteContainer activeTab={activeTab} />
        </div>
    );
};

export default LocationSection;
