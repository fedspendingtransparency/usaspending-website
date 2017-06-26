/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import { formatNumber } from 'helpers/moneyFormatter';

const propTypes = {
    label: React.PropTypes.string,
    internal: React.PropTypes.string,
    count: React.PropTypes.number,
    active: React.PropTypes.bool,
    enabled: React.PropTypes.bool,
    switchTab: React.PropTypes.func
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
        const comingSoonModule = (<ComingSoonLabel />);
        let activeClass = '';
        let comingSoon = '';
        let disabledStatus = '';
        let status = '';
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.enabled === false) {
            comingSoon = comingSoonModule;
            status = ' coming-soon';
            disabledStatus = true;
        }
        else {
            status = '';
            disabledStatus = false;
        }

        return (
            <button
                className={`table-type-toggle${activeClass}${status}`}
                onClick={this.clickedTab}
                title={`Show ${this.props.label}`}
                disabled={disabledStatus}>
                <div className="tab-content">
                    <div className="tab-label">
                        {this.props.label}
                    </div>
                    <div className={`count-badge ${activeClass}`}>
                        {formatNumber(this.props.count)}
                    </div>
                </div>
                {comingSoon}
            </button>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
