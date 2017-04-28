/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

const propTypes = {
    label: React.PropTypes.string,
    internal: React.PropTypes.string,
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
                {this.props.label}
                {comingSoon}
            </button>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
