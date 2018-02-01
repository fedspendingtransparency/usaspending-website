/**
 * AgencyLandingHeader.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';

export default class AgencyLandingHeader extends React.Component {
    render() {
        return (
            <div className="search-header-wrapper">
                <div className="search-header-container">
                    <div
                        className="search-header"
                        aria-labelledby="main-focus">
                        <div className="search-title">
                            <h1 tabIndex={-1} id="main-focus">
                                Agency Profiles
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
