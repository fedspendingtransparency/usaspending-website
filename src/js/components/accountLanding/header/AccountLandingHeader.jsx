/**
 * AccountLandingHeader.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';

export default class AccountLandingHeader extends React.Component {
    render() {
        return (
            <div className="search-header-wrapper">
                <div className="search-header-container">
                    <div
                        className="search-header"
                        aria-labelledby="main-focus">
                        <div className="search-title">
                            <h1 tabIndex={-1} id="main-focus">
                                Federal Account Profiles
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
