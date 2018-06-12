/**
 * SearchBar.jsx
 * Created by Kevin Li 4/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Search } from '../../icons/Icons';

const propTypes = {
    homepage: PropTypes.bool
};

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.expandSearch = this.expandSearch.bind(this);
        this.collapseSearch = this.collapseSearch.bind(this);
    }

    expandSearch() {
        this.setState({
            expanded: false
        });
    }

    collapseSearch() {
        this.setState({
            expanded: false
        });
    }

    toggleSearch() {
        if (this.state.expanded) {
            this.collapseSearch();
        }
        else {
            this.expandSearch();
        }
    }

    render() {
        let homepage = '';
        if (this.props.homepage) {
            homepage = 'homepage';
        }

        return (
            <div className={`header-search-bar ${homepage}`}>
                <button
                    aria-label="Search"
                    className="header-search-button"
                    onClick={this.toggleSearch}>
                    <Search alt="Search" />
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = propTypes;
