/**
 * LocationSection.jsx
 * Created by Kevin Li 11/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import POPFilterContainer from 'containers/search/filters/location/POPFilterContainer';
import RecipientFilterContainer from 'containers/search/filters/location/RecipientFilterContainer';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import FilterTabs from "../../../sharedComponents/filterSidebar/FilterTabs";

const propTypes = {
    selectedRecipientLocations: PropTypes.object,
    selectedLocations: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const LocationSection = ({ selectedRecipientLocations, selectedLocations, dirtyFilters }) => {
    const [activeTab, setActiveTab] = useState('pop');
    const [hint, setHint] = useState();
    const [filter, setFilter] = useState(<POPFilterContainer />);

    const openDefaultTab = () => {
        // check if the recipient or place of performance (default) tab should be enabled based
        // on the currently selected filters
        if (selectedRecipientLocations.count() > 0 && selectedLocations.count() === 0) {
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

    useEffect(() => {
        if (activeTab === 'recipient') {
            setFilter(<RecipientFilterContainer />);
        }
        else {
            setFilter(<POPFilterContainer />);
        }
    }, [activeTab]);

    const tabLabels = [
        {
            internal: 'pop',
            label: 'Place of Performance'
        },
        {
            internal: 'recipient',
            label: 'Recipient Location'
        }
    ];

    return (
        <div className="location-filter search-filter">
            <FilterTabs
                labels={tabLabels}
                switchTab={toggleTab}
                active={activeTab} />
            {filter}
            <SubmitHint
                ref={(component) => {
                    setHint(component);
                }} />
        </div>
    );
};

LocationSection.propTypes = propTypes;
export default LocationSection;
