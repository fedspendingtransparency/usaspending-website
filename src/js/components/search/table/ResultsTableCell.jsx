/**
  * ResultsTableCell.jsx
  * Created by Kevin Li 11/30/16
  **/

import React from 'react';

const defaultProps = {
    metadata: {
        columnName: 'standard'
    }
};

const propTypes = {
    metadata: React.PropTypes.object,
    data: React.PropTypes.string
};

export default class ResultsTableCell extends React.Component {
    render() {
        return (
            <div className={`results-${this.props.metadata.columnName}-cell`}>
                {this.props.data}
            </div>
        );
    }
}

ResultsTableCell.defaultProps = defaultProps;
ResultsTableCell.propTypes = propTypes;
