/**
 * KeywordSearchBar.jsx
 * Created by Lizzie Salita 1/5/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    submitText: PropTypes.func
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
            this.props.submitText(this.state.searchString);
        }
    }

    changedInput(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    render() {
        let disabledClass = 'disabled';
        if (this.state.searchString.length > 2) {
            disabledClass = '';
        }
        return (
            <div className="keyword-search-bar">
                <form onSubmit={this.searchKeyword}>
                    <input
                        id="search"
                        type="text"
                        className="keyword-input"
                        value={this.state.searchString}
                        onChange={this.changedInput}
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
