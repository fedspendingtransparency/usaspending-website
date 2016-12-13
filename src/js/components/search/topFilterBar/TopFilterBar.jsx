/**
  * TopBar.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';
import TopFilterGroup from './TopFilterGroup';

export default class TopFilterBar extends React.Component {
    render() {
        return (
            <div className="search-top-filter-bar">
                <div className="search-top-filters">
                    <div className="search-top-filters-content">
                        <TopFilterGroup />
                        <TopFilterGroup />
                    </div>
                </div>
                <div className="search-clear-container">
                    <button
                        className="search-clear-button"
                        aria-label="Clear all filters"
                        title="Clear all filters">
                        <span className="button-label">
                            Clear all filters
                        </span>
                        <span className="close-icon">
                            <Icons.Times alt="Clear all filters" />
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}
