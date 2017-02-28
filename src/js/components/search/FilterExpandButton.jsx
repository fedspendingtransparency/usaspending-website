/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideArrow: React.PropTypes.bool,
    toggleFilter: React.PropTypes.func,
    arrowState: React.PropTypes.string,
    name: React.PropTypes.string
};

export default class FilterExpandButton extends React.Component {
    render() {
        let hiddenClass = '';
        if (this.props.hideArrow) {
            hiddenClass = ' hide';
        }

        let icon = <Icons.AngleRight />;
        if (this.props.arrowState === 'expanded') {
            icon = <Icons.AngleDown />;
        }

        let clickEvent = '';
        switch (this.props.name) {
            case 'Search':
                clickEvent = null;
                break;
            case 'Budget Categories':
                clickEvent = null;
                break;
            case 'Award ID':
                clickEvent = null;
                break;
            case 'Award Amount':
                clickEvent = null;
                break;
            case 'Other Award Items':
                clickEvent = null;
                break;
            default:
                clickEvent = this.props.toggleFilter;
                break;
        }

        return (
            <button
                className={`filter-toggle ${hiddenClass}`}
                onClick={clickEvent}>
                {icon}
                <h6 className="filter-header">{this.props.name}</h6>
                <Icons.Guide className="filter-help" />
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
