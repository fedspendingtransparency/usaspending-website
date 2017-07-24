/**
 * DetailsTabItem.jsx
 * Created by Elizabeth Dabbs 2/22/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

const propTypes = {
    label: PropTypes.string,
    internal: PropTypes.string,
    active: PropTypes.bool,
    enabled: PropTypes.bool,
    clickTab: PropTypes.func
};

export default class DetailsTabItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.clickTab(this.props.internal);
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
                className={`table-type-toggle ${activeClass}${status}`}
                onClick={this.clickedButton}
                title={`Show ${this.props.label}`}
                disabled={disabledStatus}>
                {this.props.label}
                {comingSoon}
            </button>
        );
    }
}

DetailsTabItem.propTypes = propTypes;
