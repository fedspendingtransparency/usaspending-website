/**
 * AgencyLandingSearchBar.jsx
 * Created by Lizzie Salita 7/10/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

export default class AgencyLandingSearchBar extends React.Component {
    static propTypes = {
        setSearchString: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired
    };

    onChange = (e) => {
        this.props.setSearchString(e.target.value);
    }

    render() {
        return (
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        aria-label="Search Input"
                        type="text"
                        onChange={this.onChange}
                        placeholder={this.props.placeholder} />
                    <button
                        aria-label="Search"
                        className="search-section__button">
                        <div className="search-section__button-icon">
                            <Search alt={this.props.button} />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}
