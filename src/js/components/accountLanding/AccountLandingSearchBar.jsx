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
            <div className="account-landing-search">
                <form>
                    <input
                        className="search-field"
                        type="text"
                        onChange={this.onChange.bind(this)}
                        placeholder="Start typing to find a federal account..." />
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

AccountLandingSearchBar.propTypes = propTypes;
