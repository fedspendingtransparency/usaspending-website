/**
  * HeaderCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';

const propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    header: React.PropTypes.node
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
            <div className="ibt-header-cell" style={style}>
                {this.props.header}
            </div>
        );
    }
}

HeaderCell.propTypes = propTypes;
