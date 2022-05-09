/**
 * RecipientLandingSearchBar.jsx
 * Created by David Trinh 7/11/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import GlobalConstants from 'GlobalConstants';

import { Search, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setRecipientSearchString: PropTypes.func.isRequired
};

export default class RecipientLandingSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
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
        this.props.setRecipientSearchString(this.state.recipient);
    }

    resetSearch(e) {
        e.preventDefault();
        this.setState({
            hasSubmit: false,
            recipient: ''
        });
        this.props.setRecipientSearchString("");
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
            <Search alt={`Search Recipients or ${GlobalConstants.DUNS_LABEL} DUNS`} />
        );
        if (this.state.hasSubmit) {
            icon = (
                <Close alt="Reset recipient search" />
            );
        }
        return (
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        aria-label="Search Input"
                        type="text"
                        name="recipient"
                        value={this.state.recipient}
                        onChange={this.onChange}
                        placeholder={`Recipient Name, UEI, or ${GlobalConstants.DUNS_LABEL}DUNS`} />
                    <button
                        aria-label="Search"
                        className="search-section__button"
                        onClick={this.handleClick} >
                        <div className="search-section__button-icon">
                            {icon}
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

RecipientLandingSearchBar.propTypes = propTypes;
