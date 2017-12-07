/**
  * TableCell.jsx
  * Created by Kevin Li 12/6/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    left: PropTypes.number,
    rowIndex: PropTypes.number,
    columnCount: PropTypes.number,
    column: PropTypes.object
};

export default class TableCell extends React.Component {
    constructor(props) {
        super(props);

        this.pressedKey = this.pressedKey.bind(this);
    }

    shouldComponentUpdate() {
        // never update, the cell should be entirely mounted or unmounted
        return false;
    }

    focusNextCell() {
        let nextCell = [this.props.column.index + 1, this.props.rowIndex];
        if (this.props.column.index + 1 >= this.props.columnCount) {
            // end of the row, go to the first cell of the next row
            nextCell = [0, this.props.rowIndex + 1];
        }

        this.focusCell(...nextCell);
    }

    focusPrevCell() {
        let prevCell = [this.props.column.index - 1, this.props.rowIndex];
        if (this.props.column.index === 0) {
            prevCell = [this.props.columnCount - 1, this.props.rowIndex - 1];
        }

        if (this.props.rowIndex < 0) {
            return;
        }
        this.focusCell(...prevCell);
    }

    focusNextRow() {
        const nextCell = [this.props.column.index, this.props.rowIndex + 1];
        this.focusCell(...nextCell);
    }

    focusPrevRow() {
        const prevCell = [this.props.column.index, this.props.rowIndex - 1];
        if (this.props.rowIndex === 0) {
            return;
        }
        this.focusCell(...prevCell);
    }

    focusCell(x, y) {
        this.props.scrollToCell(x, y, 'right');
        window.setTimeout(() => {
            const cell = document.getElementById(`ibt-cell-${x}-${y}`);
            if (cell) {
                cell.focus();
            }
        }, 300);
    }

    pressedKey(e) {
        e.preventDefault();

        switch (e.key) {
            case 'ArrowRight':
                this.focusNextCell();
                break;
            case 'ArrowLeft':
                this.focusPrevCell();
                break;
            case 'ArrowUp':
                this.focusPrevRow();
                break;
            case 'ArrowDown':
                this.focusNextRow();
                break;
            default:
                return;
        }
    }

    render() {
        const style = {
            maxHeight: this.props.height,
            minHeight: this.props.height,
            maxWidth: this.props.width,
            minWidth: this.props.width,
            left: this.props.left
        };

        return (
            <div
                id={`ibt-cell-${this.props.column.index}-${this.props.rowIndex}`}
                className="ibt-table-cell"
                style={style}
                role="gridcell"
                aria-rowindex={this.props.rowIndex + 1}
                aria-colindex={this.props.column.index + 1}
                aria-describedby={`ibt-header-${this.props.column.index}`}
                onKeyDown={this.pressedKey}
                tabIndex={-1}>
                {this.props.column.cell(this.props.rowIndex)}
            </div>
        );
    }
}

TableCell.propTypes = propTypes;
