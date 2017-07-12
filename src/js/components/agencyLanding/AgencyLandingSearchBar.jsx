/**
 * AgencyLandingSearchBar.jsx
 * Created by Lizzie Salita 7/10/17
 */

import React from 'react';

import { Search } from 'components/sharedComponents/icons/Icons';

export default class AgencyLandingSearchBar extends React.Component {
    // constructor(props) {
    //    super(props);
    // }

    render() {
        return (
            <div className="agency-search-bar">
                <form>
                    <input
                        className="search-field"
                        type="text"
                        placeholder="Start typing to find an agency..." />
                    <button
                        aria-label="Search"
                        className="search-button"
                        type="submit">
                        <Search alt="Search" />
                    </button>
                </form>
            </div>
        );
    }
}

