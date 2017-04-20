/**
 * SankeyMessage.jsx
 * Created by Kevin Li 4/18/17
 */

import React from 'react';

const propTypes = {
    message: React.PropTypes.string
};

export default class SankeyMessage extends React.Component {
    render() {
        return (
            <div className="sankey-message">
                {this.props.message}
            </div>
        );
    }
}

SankeyMessage.propTypes = propTypes;
