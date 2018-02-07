/**
 * AccountLandingSearchBar.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setAccountSearchString: PropTypes.func.isRequired
};

export default class AccountLandingSearchBar extends React.Component {
    onChange(e) {
        const value = e.target.value;
        this.props.setAccountSearchString(value);
    }

    render() {
        return (
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        type="text"
                        onChange={this.onChange.bind(this)}
                        placeholder="Start typing to find a federal account..." />
                    <button
                        aria-label="Search"
                        className="search-section__button">
                        <div className="search-section__button-icon">
                            <Search alt="Search Federal Accounts" />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

AccountLandingSearchBar.propTypes = propTypes;
