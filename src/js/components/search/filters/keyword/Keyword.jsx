/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submitText: PropTypes.func,
    changedInput: PropTypes.func,
    value: PropTypes.string
};

export default class Keyword extends React.Component {
    constructor(props) {
        super(props);

        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword(e) {
        e.preventDefault();
        this.props.submitText();
    }

    render() {
        return (
            <div className="keyword-filter search-filter">
                <form onSubmit={this.searchKeyword}>
                    <div className="filter-item-wrap">
                        <input
                            id="search"
                            type="text"
                            className="keyword-input"
                            placeholder="Search by Keyword"
                            value={this.props.value}
                            onChange={this.props.changedInput} />
                        <input
                            type="submit"
                            className="keyword-submit"
                            value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
