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
export class BuildingMag extends HomeBaseIcon {}
BuildingMag.defaultProps = {
    iconName: 'usa-da-building-mag',
    iconClass: 'usa-da-building-mag',
    alt: 'Magnifying Glass Inspecting a Building'
};

export class TreemapMag extends HomeBaseIcon {}
TreemapMag.defaultProps = {
    iconName: 'usa-da-treemap-mag',
    iconClass: 'usa-da-treemap-mag',
    alt: 'Magnifying Glass Inspecting a Treemap'
};

export class ApiPlug extends HomeBaseIcon {}
ApiPlug.defaultProps = {
    iconName: 'usa-da-api-plug',
    iconClass: 'usa-da-api-plug',
    alt: 'Plugin to our API'
};

export class LearnQ extends HomeBaseIcon {}
LearnQ.defaultProps = {
    iconName: 'usa-da-learn-question',
    iconClass: 'usa-da-learn-question',
    alt: 'Learn About USASpending.gov'
};

export class Explorer extends HomeBaseIcon {}
Explorer.defaultProps = {
    iconName: 'usa-da-explorer',
    iconClass: 'usa-da-explorer',
    alt: 'Explorer'
};

export class AwardSearch extends HomeBaseIcon {}
AwardSearch.defaultProps = {
    iconName: 'usa-da-award-search',
    iconClass: 'usa-da-award-search',
    alt: 'Award Search'
};
