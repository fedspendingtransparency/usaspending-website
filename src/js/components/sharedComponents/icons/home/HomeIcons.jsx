/**
  * HomeIcons.jsx
  * Created by Kevin Li 3/17/17
  */

import HomeIconSingleton from './homeIconSingleton';
import BaseIcon from '../BaseIcon';

// extend the BaseIcon component to use the home icon singleton
class HomeBaseIcon extends BaseIcon {
    constructor(props) {
        super(props);

        this.iconSingleton = HomeIconSingleton;
    }
}

// add your icons here in this format
export class Lock extends HomeBaseIcon {}
Lock.defaultProps = {
    iconName: 'usa-da-icon-lock',
    iconClass: 'usa-da-icon-lock',
    alt: 'Lock or Password Requirement Icon'
};
