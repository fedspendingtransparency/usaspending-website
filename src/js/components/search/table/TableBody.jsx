/**
  * TableBody.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import _ from 'lodash';
import TableRow from './TableRow';

export default class TableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: {
                x: 0,
                y: 0
            }
        };

        // scroll position is used for reference only
        // setting it outside of state keeps it from triggering render cycles
        this.scrollPosition = {
            x: 0,
            y: 0
        };
    }
    handleScroll(e) {
        const xScroll = e.target.scrollLeft;
        const yScroll = e.target.scrollTop;

        if (xScroll !== this.scrollPosition.x) {
            // we have scrolled left or right
            this.props.syncScrollPosition(xScroll);
        }

        if (yScroll !== this.scrollPosition.y) {
            // we have scrolled up or down
        }

        this.scrollPosition = {
            x: xScroll,
            y: yScroll
        };
    }

    
    
    render() {
        const visibleRows = [];
        for (let i = 0; i < this.props.rowsCount; i++) {
            const row = (<TableRow rowIndex={i} {...this.props} key={`row-${i}`} />);
            visibleRows.push(row);
        }

        const illusoryTopRows = null;
        const illusoryBottomRows = null;

        const totalHeight = (this.props.rowsCount * this.props.rowHeight);
        
        const visibleHeight = _.min([this.props.maxHeight, totalHeight]);
        const visibleWidth = _.min([this.props.maxWidth, this.props.width]);

        const style = {
            minHeight: visibleHeight,
            maxHeight: visibleHeight,
            width: visibleWidth
        };

        const internalStyle = {
            height: totalHeight,
            width: this.props.width
        };

        return (
            <div className="table-body-container"
                style={style}
                onScroll={this.handleScroll.bind(this)}>
                <div
                    className="table-body"
                    style={internalStyle}
                    ref={(body) => {
                        this.tableBodyRef = body;
                    }}>
                    {illusoryTopRows}
                    {visibleRows}
                    {illusoryBottomRows}
                </div>
            </div>
        );
    }
}
