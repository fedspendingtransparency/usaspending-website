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
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        type="text"
                        onChange={this.onChange.bind(this)}
                        placeholder="Start typing to find an agency..." />
                    <button
                        aria-label="Search"
                        className="search-section__button">
                        <div className="search-section__button-icon">
                            <Search alt="Search Agencies" />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

AgencyLandingSearchBar.propTypes = propTypes;
