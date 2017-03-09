/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    submitText: React.PropTypes.func,
    handleChange: React.PropTypes.func
};

export default class Keyword extends React.Component {

    render() {
        return (
            <div className="keyword-filter search-filter">
                <form
                    onSubmit={this.props.submitText}>
                    <input
                        id="search"
                        type="text"
                        className="keyword-input"
                        placeholder="eg: Education"
                        onChange={this.props.handleChange} />
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
