/**
 * LocationSection.jsx
 * Created by Kevin Li 11/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import FilterTabs from "../../../sharedComponents/filterSidebar/FilterTabs";
import LocationAutocompleteContainer from "../../../../containers/search/filters/location/LocationAutocompleteContainer";

const propTypes = {
    selectedRecipientLocations: PropTypes.object,
    selectedLocations: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const LocationSection = (props) => {
    const { selectedRecipientLocations, selectedLocations, dirtyFilters } = props;
    const [activeTab, setActiveTab] = useState('pop');
    const [hint, setHint] = useState();

    const openDefaultTab = () => {
        // check if the recipient or place of performance (default) tab should be enabled based
        // on the currently selected filters
        if (selectedRecipientLocations?.count() > 0 && selectedLocations.count() === 0) {
            // there are recipient locations and no place of performance locations
            setActiveTab('recipient');
        }
    };

    const toggleTab = (e) => {
        if ((activeTab === 'recipient' && e.target.textContent !== 'Recipient Location') || (activeTab === 'pop' && e.target.textContent !== 'Place of Performance')) {
            setActiveTab(activeTab === 'pop' ? 'recipient' : 'pop');
        }
    };

    useEffect(() => {
        openDefaultTab();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dirtyFilters]);

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

    return (
        <div className="filter-item-wrap location-filter search-filter">
            <FilterTabs
                labels={tabLabels}
                switchTab={toggleTab}
                active={activeTab} />
            <LocationAutocompleteContainer
                {...props}
                activeTab={activeTab} />
            <SubmitHint
                ref={(component) => {
                    setHint(component);
                }} />
        </div>
    );
};

LocationSection.propTypes = propTypes;
export default LocationSection;
