/**
  * AboutIcons.jsx
  * Created by Destin Frasier 4/27/17
  */

import AboutIconSingleton from './aboutIconSingleton';
import BaseIcon from '../BaseIcon';

// extend the BaseIcon component to use the about icon singleton
class AboutBaseIcon extends BaseIcon {
    constructor(props) {
        super(props);

        this.iconSingleton = AboutIconSingleton;
    }
}

// add your icons here in this format
export class QAIcon extends AboutBaseIcon {}
QAIcon.defaultProps = {
    iconName: 'usa-da-qa-icon',
    iconClass: 'usa-da-qa-icon',
    alt: ''
};

export class ContactIcon extends AboutBaseIcon {}
ContactIcon.defaultProps = {
    iconName: 'usa-da-contact-icon',
    iconClass: 'usa-da-contact-icon',
    alt: ''
};

export class DownloadIcon extends AboutBaseIcon {}
DownloadIcon.defaultProps = {
    iconName: 'usa-da-download-icon',
    iconClass: 'usa-da-download-icon',
    alt: ''
};

export class WhatsNextIcon extends AboutBaseIcon {}
WhatsNextIcon.defaultProps = {
    iconName: 'usa-da-whats-next-icon',
    iconClass: 'usa-da-whats-next-icon',
    alt: ''
};
