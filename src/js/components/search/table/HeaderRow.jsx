/**
  * HeaderRow.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import _ from 'lodash';

import HeaderCell from './HeaderCell';

export default class HeaderRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0
        };
    }

    updateScrollPosition(x) {
        this.setState({
            x: -1 * x
        });
    }

    render() {

        const visibleWidth = _.min([this.props.maxWidth, this.props.width]);

        const style = {
            height: this.props.headerHeight,
            minWidth: visibleWidth,
            maxWidth: visibleWidth
        };

        const rowStyle = {
            height: this.props.headerHeight,
            width: this.props.width,
            left: this.state.x
        };

        const headers = this.props.columns.map((column) => (
            <HeaderCell height={this.props.headerHeight} {...column} />
        ));

        return (
            <div className="table-header" style={style}>
                <div className="table-header-row" style={rowStyle} ref={(div) => {
                    this.internalDiv = div;
                }}>
                    {headers}
                </div>
            </div>
        );
    }
}
