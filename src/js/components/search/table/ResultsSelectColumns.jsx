/**
 * ResultsSelectColumns.jsx
 * Created by Lizzie Salita 05/01/17
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import ResultsColumnOption from './ResultsColumnOption';

const propTypes = {
    columns: React.PropTypes.array,
    hiddenColumns: React.PropTypes.array,
    toggleColumnVisibility: React.PropTypes.func
};

export default class ResultsSelectColumns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }

    render() {
        const numHiddenColumns = this.props.hiddenColumns.length.toString();
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
        const visibleColumns = this.props.columns.map((col) => (
            <ResultsColumnOption
                key={col.columnName}
                checked={true}
                column={col.columnName}
                label={col.displayName}
                toggleColumnVisibility={this.props.toggleColumnVisibility} />
        ));
        const hiddenColumns = this.props.hiddenColumns.map((col) => (
            <ResultsColumnOption
                key={col.columnName}
                checked={false}
                column={col.columnName}
                label={col.displayName}
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
