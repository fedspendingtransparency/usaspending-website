/**
 * PerformancePlace.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';

const propTypes = {
    handleTextInput: React.PropTypes.func
};

export default class PerformancePlace extends React.Component {

    render() {
        return (
            <div className="location-autocomplete">
                <p>Primary Place of Performance</p>
                <input
                    id="location-input"
                    type="text"
                    className="location-input awesomplete"
                    placeholder="State, City, County, Zip or District"
                    onChange={this.props.handleTextInput} />
            </div>
        );
    }
}
PerformancePlace.propTypes = propTypes;
