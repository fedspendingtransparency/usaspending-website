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

        let disabledStatus = false;
        if (this.props.name === 'Search' ||
            this.props.name === 'Budget Categories' ||
            this.props.name === 'Award Amount' ||
            this.props.name === 'Other Award Items') {
            disabledStatus = true;
        }

        return (
            <button
                className={`filter-toggle ${hiddenClass}`}
                onClick={this.props.toggleFilter}
                disabled={disabledStatus}>
                {icon}
                <h6 className="filter-header">{this.props.name}</h6>
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
