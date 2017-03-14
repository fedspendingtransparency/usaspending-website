/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    submitText: React.PropTypes.func
};

export default class Keyword extends React.Component {

    componentDidMount() {
        const inputBox = this.keyword;
        inputBox.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                this.searchKeyword();
            }
        });
    }

    searchKeyword() {
        this.props.submitText(this.keyword.value);
    }

    render() {
        return (
            <div className="keyword-filter search-filter">
                <input
                    id="search"
                    type="text"
                    className="keyword-input"
                    placeholder="Search by Keyword"
                    ref={(k) => {
                        this.keyword = k;
                    }} />
                <input
                    type="submit"
                    className="keyword-submit"
                    value="Submit"
                    onClick={this.searchKeyword.bind(this)} />
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
