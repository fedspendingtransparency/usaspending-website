/**
 * NoFiltersScreen.jsx
 * Created by Kevin Li 12/26/17
 */

import React from 'react';

import { CircleArrowLeft } from 'components/sharedComponents/icons/Icons';

const NoFiltersScreen = () => (
    <div className="visualization-status-screen">
        <div className="visualization-no-filters-screen">
            <div className="icon">
                <CircleArrowLeft alt="Choose a filter" />
            </div>
            <div className="message">
                Choose your filters and submit your search to begin.
            </div>
        </div>
    </div>
);

export default NoFiltersScreen;
