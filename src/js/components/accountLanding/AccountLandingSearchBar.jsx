/**
 * AccountLandingSearchBar.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setAccountSearchString: PropTypes.func.isRequired
};

export default class AccountLandingSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            hasSubmit: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            hasSubmit: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            hasSubmit: true
        });
        this.props.setAccountSearchString(this.state.keyword);
    }

    resetSearch(e) {
        e.preventDefault();
        this.setState({
            hasSubmit: false,
            keyword: ''
        });
        this.props.setAccountSearchString("");
    }

    handleClick(e) {
        if (this.state.hasSubmit) {
            this.resetSearch(e);
        }
        else {
            this.onSubmit(e);
        }
    }

    render() {
        let icon = (
            <Search alt="Search Federal Accounts" />
        );
        if (this.state.hasSubmit) {
            icon = (
                <Close alt="Reset federal accounts search" />
            );
        }
        return (
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        aria-label="Search Input"
                        name="keyword"
                        value={this.state.keyword}
                        type="text"
                        onChange={this.onChange}
                        placeholder="Search by Account Number, Account Name, or Agency..." />
                    <button
                        aria-label="Search"
                        onClick={this.handleClick}
                        className="search-section__button">
                        <div className="search-section__button-icon">
                            {icon}
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

AccountLandingSearchBar.propTypes = propTypes;
