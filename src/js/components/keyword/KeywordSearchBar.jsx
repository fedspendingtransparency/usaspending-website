/**
 * KeywordSearchBar.jsx
 * Created by Lizzie Salita 1/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    updateKeyword: PropTypes.func
};

export default class KeywordSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ''
        };

        this.changedInput = this.changedInput.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword(e) {
        e.preventDefault();
        if (this.state.searchString.length > 2) {
            this.props.updateKeyword(this.state.searchString);
        }
    }

    changedInput(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    render() {
        let disabledClass = 'keyword-search-bar__button_disabled';
        let submitButtonText = 'Enter at least three characters to search';
        if (this.state.searchString.length > 2) {
            disabledClass = '';
            submitButtonText = 'Search by Keyword';
        }
        return (
            <form
                className="keyword-search-bar__form"
                onSubmit={this.searchKeyword}>
                <input
                    id="search"
                    type="text"
                    className="keyword-search-bar__input"
                    value={this.state.searchString}
                    onChange={this.changedInput}
                    placeholder="Type keywords..." />
                <button
                    className={`keyword-search-bar__button ${disabledClass}`}
                    onClick={this.searchKeyword}
                    title={submitButtonText}
                    aria-label={submitButtonText}>
                    <div className="keyword-search-bar__button-icon">
                        <Search alt="Search by Keyword" />
                    </div>
                </button>
            </form>
        );
    }
}

KeywordSearchBar.propTypes = propTypes;
