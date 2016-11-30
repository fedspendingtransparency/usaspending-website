/**
  * ResultsTableTabItem.jsx
  * Created by Kevin Li 11/29/16
  **/

import React from 'react';

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
        let activeClass = '';
        if (this.props.active) {
            activeClass = ' active';
        }

        return (
            <button
                className={`table-type-toggle${activeClass}`}
                onClick={this.clickedTab}
                title={`Show ${this.props.label}`}>
                {this.props.label}
            </button>
        );
    }
}

ResultsTableTabItem.propTypes = propTypes;
