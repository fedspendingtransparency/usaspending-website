/**
  * Table.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import HeaderRow from './HeaderRow';
import TableBody from './TableBody';

const defaultProps = {
    resetHash: '1'
};

const propTypes = {
    resetHash: PropTypes.string,
    maxWidth: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.syncScrollPosition = this.syncScrollPosition.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.resetHash !== this.props.resetHash) {
            this.resetScroll();
        }
    }

    syncScrollPosition(x, y) {
        // directly modify the DOM CSS element rather than trigger re-renders via prop changes
        this.headerRow.updateScrollPosition(x, y);
    }

    resetScroll() {
        // reset the scroll position to the top left corner
        this.body.resetScroll();
        this.headerRow.updateScrollPosition(0, 0);
    }

    render() {
        const style = {
            minWidth: this.props.maxWidth,
            maxWidth: this.props.maxWidth
        };

        return (
            <div className="ibt-table-container" style={style} role="presentation">
                <HeaderRow
                    {...this.props}
                    ref={(header) => {
                        this.headerRow = header;
                    }} />
                <TableBody
                    {...this.props}
                    syncScrollPosition={this.syncScrollPosition}
                    ref={(body) => {
                        this.body = body;
                    }} />
            </div>
        );
    }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

