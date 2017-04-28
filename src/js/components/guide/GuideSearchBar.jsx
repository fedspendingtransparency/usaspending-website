/**
 * GuideSearchBar.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideGuide: React.PropTypes.func
};

export default class GuideSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.submitSearch = this.submitSearch.bind(this);
    }

    submitSearch(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="guide-search-bar">
                <form onSubmit={this.submitSearch}>
                    <input
                        className="search-field"
                        type="text"
                        placeholder="Search for a term..." />
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

GuideSearchBar.propTypes = propTypes;
