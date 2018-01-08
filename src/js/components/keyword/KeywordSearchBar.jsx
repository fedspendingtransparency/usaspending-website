/**
 * KeywordSearchBar.jsx
 * Created by Lizzie Salita 1/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    submitText: PropTypes.func,
    changedInput: PropTypes.func,
    value: PropTypes.string
};

export default class KeywordSearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword(e) {
        e.preventDefault();
        if (this.props.value.length > 2) {
            this.props.submitText();
        }
    }

    render() {
        let disabledClass = 'disabled';
        if (this.props.value.length > 2) {
            disabledClass = '';
        }
        return (
            <div className="keyword-search-bar">
                <form onSubmit={this.searchKeyword}>
                    <input
                        id="search"
                        type="text"
                        className="keyword-input"
                        value={this.props.value}
                        onChange={this.props.changedInput}
                        placeholder="Type keywords" />
                    <button
                        className={`keyword-submit ${disabledClass}`}
                        onClick={this.searchKeyword}
                        title="Search by Keyword"
                        aria-label="Search by Keyword">
                        <div className="icon">
                            <Search alt="Search by Keyword" />
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

KeywordSearchBar.propTypes = propTypes;
