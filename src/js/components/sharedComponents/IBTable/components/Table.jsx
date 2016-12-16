/**
  * Table.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';

import HeaderRow from './HeaderRow';
import TableBody from './TableBody';

const propTypes = {
    maxWidth: React.PropTypes.number.isRequired
};

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.syncScrollPosition = this.syncScrollPosition.bind(this);
    }

    syncScrollPosition(x, y) {
        // directly modify the DOM CSS element rather than trigger re-renders via prop changes
        this.headerRow.updateScrollPosition(x, y);
    }

    render() {
        const style = {
            minWidth: this.props.maxWidth,
            maxWidth: this.props.maxWidth
        };

        return (
            <div className="ibt-table-container" style={style}>
                <HeaderRow
                    {...this.props}
                    ref={(header) => {
                        this.headerRow = header;
                    }} />
                <TableBody
                    {...this.props}
                    syncScrollPosition={this.syncScrollPosition} />
            </div>
        );
    }
}

Table.propTypes = propTypes;
