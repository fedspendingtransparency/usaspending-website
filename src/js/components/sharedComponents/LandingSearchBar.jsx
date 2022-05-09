/**
 * LandingSearchBar.jsx
 * Created by Lizzie Salita 7/10/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

export default class LandingSearchBar extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        buttonAltText: PropTypes.string.isRequired
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e.target[0].value);
    };

    render() {
        return (
            <div className="search-section">
                <form className="search-section__form" onSubmit={this.onSubmit}>
                    <input
                        className="search-section__input"
                        aria-label="Search Input"
                        type="text"
                        placeholder={this.props.placeholder} />
                    <button
                        type="submit"
                        aria-label="Search"
                        className="search-section__button">
                        <div className="search-section__button-icon">
                            <Search alt={this.props.buttonAltText} />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}
