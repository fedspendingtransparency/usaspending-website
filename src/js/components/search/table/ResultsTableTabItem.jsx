/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

export default class ResultsTableTabItem extends React.Component {
    render() {
        return (
            <button className="table-type-toggle">
                {this.props.label}
            </button>
        );
    }
}
