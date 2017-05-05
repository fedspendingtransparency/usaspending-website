/**
 * NextStepsBox.jsx
 * Created by Destin Frasier 04/27/2017
 **/

import React from 'react';
import * as AboutIcons from 'components/sharedComponents/icons/about/AboutIcons';


const propTypes = {
    icon: React.PropTypes.string,
    sectionTitle: React.PropTypes.string,
    sectionText: React.PropTypes.string,
    linkText: React.PropTypes.string,
    linkUrl: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    ariaLabel: React.PropTypes.string,
    title: React.PropTypes.string
};

export default class NextStepsBox extends React.Component {


    switchIcon() {
        let icon = this.props.icon;
        switch (icon) {
            case 'faq':
                icon = (<AboutIcons.QAIcon className="usa-da-qa-icon" />);
                break;
            case 'contact':
                icon = (<AboutIcons.ContactIcon className="usa-da-contact-icon" />);
                break;
            case 'download':
                icon = (<AboutIcons.DownloadIcon className="usa-da-download-icon" />);
                break;
            case 'next':
                icon = (<AboutIcons.WhatsNextIcon className="usa-da-whats-next-icon" />);
                break;
            default:
                icon = '';
                break;
        }
        return icon;
    }

    render() {
        let link = (
            <a href={this.props.linkUrl}>
                <button className="usa-button-outline" aria-label={this.props.ariaLabel} title={this.props.title}>
                    {this.props.linkText}
                </button>
            </a>
        );

        if (this.props.icon === 'download') {
            link = (
                <button className="usa-button-disabled-outline">
                    Coming Soon...
                </button>
            );
        }

        return (
            <div className="block-wrap">
                <div className="icon-wrap">
                    <div className={this.props.iconClass}>
                        {this.switchIcon()}
                    </div>
                </div>
                <h6>{this.props.sectionTitle}</h6>
                <p>{this.props.sectionText}</p>
                {link}
            </div>
        );
    }
}
NextStepsBox.propTypes = propTypes;
