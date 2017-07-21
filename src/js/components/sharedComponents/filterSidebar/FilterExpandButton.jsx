/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideArrow: PropTypes.bool,
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool
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
                onClick={this.props.toggleFilter}
                disabled={this.props.disabled}>
                {icon}
                <h6 className="filter-header">{this.props.name}</h6>
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
