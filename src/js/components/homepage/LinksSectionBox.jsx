/**
 * LinksSectionBox.jsx
 * Created by Marco Mendoza 03/16/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as HomeIcons from 'components/sharedComponents/icons/home/HomeIcons';

const propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string
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
                <h6 className={`links-section-box-primary-text${disabledStatus}`}>
                    {this.props.title}
                </h6>
                <p className={`links-section-box-secondary-text${disabledStatus}`}>
                    {this.props.subtitle}
                </p>
                {link}
            </div>
        );
    }
}
LinksSectionBox.propTypes = propTypes;
