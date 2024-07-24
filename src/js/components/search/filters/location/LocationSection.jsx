/**
 * LocationSection.jsx
 * Created by Kevin Li 11/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import POPFilterContainer from 'containers/search/filters/location/POPFilterContainer';
import RecipientFilterContainer from 'containers/search/filters/location/RecipientFilterContainer';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    selectedRecipientLocations: PropTypes.object,
    selectedLocations: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const LocationSection = ({ selectedRecipientLocations, selectedLocations, dirtyFilters }) => {
    const [activeTab, setActiveTab] = useState('pop');
    const [hint, setHint] = useState();

    const openDefaultTab = () => {
        // check if the recipient or place of performance (default) tab should be enabled based
        // on the currently selected filters
        if (selectedRecipientLocations.count() > 0 && selectedLocations.count() === 0) {
            // there are recipient locations and no place of performance locations
            setActiveTab('recipient');
        }
    };

    const toggleTab = (e) => {
        const type = e.target.value;

        setActiveTab(type);
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

    let activePop = '';
    if (activeTab !== 'pop') {
        activePop = 'inactive';
    }

    let activeRecipient = '';
    if (activeTab !== 'recipient') {
        activeRecipient = 'inactive';
    }

    let filter = <POPFilterContainer />;
    if (activeTab === 'recipient') {
        filter = <RecipientFilterContainer />;
    }

    return (
        <div className="location-filter search-filter">
            <ul
                className="toggle-buttons"
                role="menu">
                <li>
                    <button
                        className={`tab-toggle ${activePop}`}
                        value="pop"
                        role="menuitemradio"
                        aria-checked={activeTab === 'pop'}
                        title="Place of Performance"
                        aria-label="Place of Performance"
                        onClick={toggleTab}>
                        Place of Performance
                    </button>
                </li>
                <li>
                    <button
                        className={`tab-toggle ${activeRecipient}`}
                        value="recipient"
                        role="menuitemradio"
                        aria-checked={activeTab === 'recipient'}
                        title="Recipient Location"
                        aria-label="Recipient Location"
                        onClick={toggleTab}>
                        Recipient Location
                    </button>
                </li>
            </ul>
            <div className="toggle-border" />
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
