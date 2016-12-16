/**
  * ResultsTableHeaderCell.jsx
  * Created by Kevin Li 12/1/16
  **/

import React from 'react';

const propTypes = {
    label: React.PropTypes.string,
    column: React.PropTypes.string
};

export default class ResultsTableHeaderCell extends React.Component {
    render() {
        return (
            <div className={`award-result-header-cell column-${this.props.column}`}>
                <div className="cell-content">
                    {this.props.label}
                </div>
            </div>
        );
    }
}

ResultsTableHeaderCell.propTypes = propTypes;
