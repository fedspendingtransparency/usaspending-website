/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    submitText: React.PropTypes.func
};

export default class Keyword extends React.Component {

    searchKeyword() {
        this.props.submitText(this.keyword.value);
    }

    render() {
        return (
            <div className="keyword-filter search-filter">
                <form>
                    <input
                        id="search"
                        type="text"
                        className="keyword-input"
                        placeholder="e.g., Education"
                        ref={(k) => {
                            this.keyword = k;
                        }} />
                    <input
                        type="submit"
                        className="keyword-submit"
                        value="Submit"
                        onClick={this.searchKeyword.bind(this)} />
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
