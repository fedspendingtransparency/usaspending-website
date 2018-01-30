/**
 * ResultsSelectColumns.jsx
 * Created by Lizzie Salita 05/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as Icons from 'components/sharedComponents/icons/Icons';

import ResultsColumnOption from './ResultsColumnOption';
import ResultsColumnVisibleOption from './ResultsColumnVisibleOption';

const propTypes = {
    columns: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    reorderColumns: PropTypes.func
};

class ResultsSelectColumns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.moveColumn = this.moveColumn.bind(this);
    }

    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }

    moveColumn(dragIndex, hoverIndex) {
        this.props.reorderColumns(dragIndex, hoverIndex);
    }

    render() {
        const hidden = this.props.columns.hiddenOrder.toJS();
        const visible = this.props.columns.visibleOrder.toJS();
        const numHiddenColumns = hidden.length.toString();
        let hiddenColumnsText = `Hidden Columns`;
        if (numHiddenColumns === "1") {
            hiddenColumnsText = `Hidden Column`;
        }
        let showDropdown = 'hide';
        let buttonClass = '';
        let icon = <Icons.TableOpen alt="Select Columns" />;
        if (this.state.showDropdown) {
            showDropdown = '';
            buttonClass = 'blue';
            icon = <Icons.TableClosed alt="Select Columns" />;
        }

        const visibleColumns = visible.map((title, i) => (
            <ResultsColumnVisibleOption
                key={title}
                checked="visible"
                column={title}
                label={title}
                toggleColumnVisibility={this.props.toggleColumnVisibility}
                index={i}
                id={title}
                moveColumn={this.moveColumn} />
        ));
        const hiddenColumns = this.props.columns.hiddenOrder.map((title) => (
            <ResultsColumnOption
                key={title}
                checked=""
                column={title}
                label={title}
                toggleColumnVisibility={this.props.toggleColumnVisibility} />
        ));

        return (
            <div className="results-select-columns">
                <button
                    className={`results-select-columns-btn ${buttonClass}`}
                    onClick={this.toggleDropdown}>
                    <span className="btn-text">
                        {`${numHiddenColumns} ${hiddenColumnsText}`}
                    </span>
                    <span className="icon">
                        {icon}
                    </span>
                </button>
                <div className={`results-select-columns-dropdown ${showDropdown}`}>
                    <div className="results-select-columns-header">
                        Visible Columns
                    </div>
                    <ul>
                        {visibleColumns}
                    </ul>
                    <div className="results-select-columns-header">
                        Hidden Columns
                        <div className="results-select-columns-hidden">
                            {numHiddenColumns}
                        </div>
                    </div>
                    <ul>
                        {hiddenColumns}
                    </ul>
                </div>
            </div>
        );
    }
}

ResultsSelectColumns.propTypes = propTypes;

export default DragDropContext(HTML5Backend)(ResultsSelectColumns);
