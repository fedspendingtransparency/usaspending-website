/**
  * HeaderCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import ResultsTableHeaderCell from './cells/ResultsTableHeaderCell';

export default class HeaderCell extends React.Component {
    render() {
        const style = {
            maxHeight: this.props.height,
            minHeight: this.props.height,
            maxWidth: this.props.width,
            minWidth: this.props.width
        };

        return (
            <div className="table-header-cell" style={style}>
                {this.props.header}
            </div>
        );
    }
}
