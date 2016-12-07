/**
  * Table.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';

import HeaderRow from './HeaderRow';
import TableBody from './TableBody';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.syncScrollPosition = this.syncScrollPosition.bind(this);
    }
    syncScrollPosition(x) {
        // directly modify the DOM CSS element rather than trigger re-renders
        this.headerRow.updateScrollPosition(x);
    }

    render() {
        const style = {
            minWidth: this.props.maxWidth,
            maxWidth: this.props.maxWidth
        };

        return (
            <div className="table-container" style={style}>
                <HeaderRow {...this.props} ref={(header) => {
                    this.headerRow = header;
                }} />
                <TableBody {...this.props} syncScrollPosition={this.syncScrollPosition} />
            </div>
        );
    }
}
