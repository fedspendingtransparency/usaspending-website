/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    submitText: React.PropTypes.func,
    changedInput: React.PropTypes.func,
    value: React.PropTypes.string
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
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
