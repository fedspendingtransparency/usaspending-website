/**
 * GuideSearchBar.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    guide: React.PropTypes.object,
    setSearchValue: React.PropTypes.func
};

export default class GuideSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.submitSearch = this.submitSearch.bind(this);
        this.changedSearchValue = this.changedSearchValue.bind(this);
    }

    submitSearch(e) {
        if (e) {
            e.preventDefault();
        }
    }

    changedSearchValue(e) {
        this.props.setSearchValue(e.target.value);
        this.submitSearch();
    }

    render() {
        return (
            <div className="guide-search-bar">
                <form onSubmit={this.submitSearch}>
                    <input
                        className="search-field"
                        type="text"
                        value={this.props.guide.search.input}
                        placeholder="Search for a term..."
                        onChange={this.changedSearchValue} />
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
