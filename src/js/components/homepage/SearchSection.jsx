/**
 * SearchSection.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';

export default class SearchSection extends React.Component {

    render() {
        return (
            <div className="search-section-links-outer-wrap">
                <div className="search-section-links-wrap">
                    <h1 className="search-section-links-primary-text">
                        There&apos;s More to Explore.
                    </h1>
                    <h2 className="search-section-links-sub-text">
                        Search through all U.S. Government Spending.
                    </h2>
                    <a href="#/search">
                        <button
                            className="search-section-links-button"
                            title="Start your search"
                            aria-label="Start your search">
                            Start Your Search
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}
