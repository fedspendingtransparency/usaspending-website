/**
 * LinksSectionBox.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';

import * as HomeIcons from 'components/sharedComponents/icons/home/HomeIcons';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    icon: React.PropTypes.string,
    text: React.PropTypes.string,
    linkText: React.PropTypes.string,
    linkUrl: React.PropTypes.string
};

export default class LinksSectionBox extends React.Component {

    switchIcon() {
        let icon = this.props.icon;

        switch (icon) {
            case 'recipient':
                icon = (<HomeIcons.BuildingMag className="usa-da-building-mag" />);
                break;
            case 'federalAccount':
                icon = (<HomeIcons.TreemapMag className="usa-da-treemap-mag" />);
                break;
            case 'api':
                icon = (<HomeIcons.ApiPlug className="usa-da-api-plug" />);
                break;
            case 'resources':
                icon = (<HomeIcons.LearnQ className="usa-da-learn-question" />);
                break;
            default:
                icon = '';
                break;
        }
        return icon;
    }

    render() {
        let disabledStatus = '';
        let link = (
            <a className="links-section-box-anchor" href={this.props.linkUrl}>
                <button className="usa-button-outline">
                    {this.props.linkText}
                </button>
            </a>
        );

        if (this.props.icon === 'recipient' ||
            this.props.icon === 'federalAccount') {
            disabledStatus = ' disabled';
            link = (
                <button className="usa-button-disabled-outline">
                    Coming Soon...
                </button>
            );
        }

        return (
            <div className="links-section-box">
                {this.switchIcon()}
                <h4 className={`links-section-box-primary-text${disabledStatus}`}>
                    {this.props.text}
                </h4>
                {link}
            </div>
        );
    }
}
LinksSectionBox.propTypes = propTypes;
