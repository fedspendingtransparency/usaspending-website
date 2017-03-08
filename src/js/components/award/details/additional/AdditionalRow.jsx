/**
 * AdditionalRow.jsx
 * Created by Kevin Li 3/3/17
 */

import React from 'react';

const propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
};

export default class AdditionalRow extends React.Component {
    render() {
        return (
            <div className="additional-row">
                <div className="row-title">
                    {this.props.title}
                </div>
                <div className="row-value">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

AdditionalRow.propTypes = propTypes;
