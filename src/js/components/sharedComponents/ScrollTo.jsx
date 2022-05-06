/**
  * ScrollTo.jsx
  * Created by Destin Frasier 04/21/2017
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { scrollToY } from 'helpers/scrollToHelper';

const propTypes = {
    code: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    accessibleLabel: PropTypes.string.isRequired
};

export default class ScrollTo extends React.Component {
    constructor(props) {
        super(props);
        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
    // find the DOM element of the section, if it exists
        const sectionDom = document.querySelector(`#scroll-to-${this.props.code}`);
        if (sectionDom) {
            const sectionTop = sectionDom.offsetTop - 10;
            scrollToY(sectionTop, 700);
        }
    }

    render() {
        return (
            <button
                title={this.props.accessibleLabel}
                aria-label={this.props.accessibleLabel}
                role={this.props.role}
                className={this.props.className}
                onClick={this.clickedButton}>
                {this.props.label}
                {this.props.icon}
            </button>
        );
    }
}

ScrollTo.propTypes = propTypes;
