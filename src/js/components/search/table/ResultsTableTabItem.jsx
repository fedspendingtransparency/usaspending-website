/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    label: React.PropTypes.string,
    internal: React.PropTypes.string,
    active: React.PropTypes.bool,
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
        let activeClass = '',
            comingSoon = '',
            status = '',
            clickEvent = '';
        if (this.props.active) {
            activeClass = ' active';
        }
        if (this.props.status == 'inactive') {
            comingSoon = (
                <div className="coming-soon-container">
                    <div className="coming-soon-icon">
                        <Icons.ExclamationCircle />
                    </div>
                    <span className="coming-soon-label">Coming Soon</span>
                </div>
            );
            status = 'coming-soon';
            clickEvent = null;

        } else {
            comingSoon = '';
            status = '';
            clickEvent = this.clickedTab
        }

        return (
            <button
                className={`table-type-toggle${activeClass}` + ' ' + status}
                onClick={clickEvent}
                title={`Show ${this.props.label}`}>
                {this.props.label}
                {comingSoon}
            </button>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
