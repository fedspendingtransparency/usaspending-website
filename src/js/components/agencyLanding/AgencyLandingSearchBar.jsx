/**
 * AgencyLandingSearchBar.jsx
 * Created by Lizzie Salita 7/10/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setAgencySearchString: PropTypes.func.isRequired
};

export default class AgencyLandingSearchBar extends React.Component {
    onChange(e) {
        const value = e.target.value;
        this.props.setAgencySearchString(value);
    }

    render() {
        return (
            <div className="agency-landing-search">
                <form>
                    <input
                        className="search-field"
                        type="text"
                        onChange={this.onChange.bind(this)}
                        placeholder="Start typing to find an agency..." />
                    <button
                        aria-label="Search"
                        className="search-button">
                        <Search alt="Search" />
                    </button>
                </form>
            </div>
        );
    }
}

AgencyLandingSearchBar.propTypes = propTypes;
