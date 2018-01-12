/**
 * ResultsTableTabItem.jsx
 * Created by Lizzie Salita 1/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    internal: PropTypes.string,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    switchTab: PropTypes.func
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
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.enabled === false) {
            disabledStatus = true;
        }
        else {
            disabledStatus = false;
        }

        return (
            <button
                className={`table-type-toggle${activeClass}`}
                onClick={this.clickedTab}
                title={`Show ${this.props.label}`}
                disabled={disabledStatus}>
                <div className="tab-content">
                    <div className="tab-label">
                        {this.props.label}
                    </div>
                </div>
            </button>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
