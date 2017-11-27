/**
  * HeaderCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    header: PropTypes.node
};

export default class HeaderCell extends React.Component {
    render() {
        const style = {
            maxHeight: this.props.height,
            minHeight: this.props.height,
            maxWidth: this.props.width,
            minWidth: this.props.width
        };

        return (
            <div
                className="ibt-header-cell"
                style={style}
                role="columnheader">
                {this.props.header}
            </div>
        );
    }
}

HeaderCell.propTypes = propTypes;
