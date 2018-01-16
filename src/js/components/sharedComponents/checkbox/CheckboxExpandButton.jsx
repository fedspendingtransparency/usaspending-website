/**
 * CheckboxExpandButton.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '../icons/Icons';

const defaultProps = {
    hidden: false
};

const propTypes = {
    hidden: PropTypes.bool,
    toggleExpand: PropTypes.func,
    arrowState: PropTypes.string
};

export default class CheckboxExpandButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        if (this.props.hidden) {
            // button is disabled
            return;
        }
        this.props.toggleExpand();
    }

    render() {
        let hiddenClass = '';
        if (this.props.hidden) {
            hiddenClass = 'hidden-button';
        }

        let icon = <Icons.AngleRight />;
        if (this.props.arrowState === 'expanded') {
            icon = <Icons.AngleDown />;
        }

        return (
            <button
                className={`toggle ${hiddenClass}`}
                onClick={this.clickedButton}
                title="child filters"
                disabled={this.props.hidden}
                aria-expanded={this.props.arrowState === 'expanded'}>
                {icon}
            </button>
        );
    }
}

CheckboxExpandButton.defaultProps = defaultProps;
CheckboxExpandButton.propTypes = propTypes;
