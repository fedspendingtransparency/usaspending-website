/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from 'helpers/moneyFormatter';
import { createOnKeyDownHandler } from 'helpers/keyboardEventsHelper';

const propTypes = {
    label: PropTypes.string,
    internal: PropTypes.string,
    count: PropTypes.number,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    switchTab: PropTypes.func,
    hideCounts: PropTypes.bool,
    className: PropTypes.string,
    tooltip: PropTypes.element
};

export default class ResultsTableTabItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedTab = this.clickedTab.bind(this);
    }

    clickedTab() {
        this.props.switchTab(this.props.internal);
    }

    render() {
        let activeClass = '';
        let disabledStatus = '';
        let disabledClass = '';
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.enabled === false) {
            disabledStatus = true;
            disabledClass = ' disabled';
        }
        else if (!this.props.hideCounts && (!this.props.count || this.props.count === 0)) {
            disabledStatus = true;
            disabledClass = ' disabled';
        }
        else {
            disabledStatus = false;
            disabledClass = '';
        }

        let resultString = 'results';
        if (this.props.count === 1) {
            resultString = 'result';
        }

        let count = null;
        if (!this.props.hideCounts) {
            count = (
                <div className={`count-badge ${activeClass}`}>
                    {formatNumber(this.props.count)}
                </div>
            );
        }
        const className = `table-type-toggle${activeClass} ${this.props.className}${disabledClass}`;
        const onKeyDownHandler = createOnKeyDownHandler(this.clickedTab);
        return (
            <div className={`table-type-toggle__wrapper${disabledClass}`}>
                <div
                    className={className}
                    onClick={this.clickedTab}
                    onKeyDown={onKeyDownHandler}
                    role="menuitemradio"
                    aria-checked={this.props.active}
                    title={`Show ${this.props.label}`}
                    aria-label={`Show ${this.props.label} - ${this.props.count} ${resultString}`}
                    tabIndex={0}
                    disabled={disabledStatus}>
                    <div className="tab-content">
                        <div className="tab-label">
                            {this.props.label}
                        </div>
                        {count}
                        {this.props.tooltip}
                    </div>
                </div>
            </div>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
