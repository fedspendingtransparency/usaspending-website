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

        return (
            <button
                className={`filter-toggle ${hiddenClass}`}
                onClick={this.props.toggleFilter}>
                {icon}
                <h6 className="filter-header">{this.props.name}</h6>
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
