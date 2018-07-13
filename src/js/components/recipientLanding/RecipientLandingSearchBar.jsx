/**
 * RecipientLandingSearchBar.jsx
 * Created by David Trinh 7/11/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setRecipientSearchString: PropTypes.func.isRequired
};

export default class RecipientLandingSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.setRecipientSearchString(this.state.recipient);
    }

    render() {
        return (
            <div className="search-section">
                <form className="search-section__form">
                    <input
                        className="search-section__input"
                        type="text"
                        name="recipient"
                        value={this.state.recipient}
                        onChange={this.onChange}
                        placeholder="Search by Recipient Name or DUNS" />
                    <button
                        aria-label="Search"
                        className="search-section__button"
                        onClick={(e) => this.onSubmit(e)} >
                        <div className="search-section__button-icon">
                            <Search alt="Search Recipients or DUNS" />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

RecipientLandingSearchBar.propTypes = propTypes;
