/**
  * FormatItem.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { scrollToY } from 'helpers/scrollToHelper';

const defaultProps = {
    isActive: false
};

const propTypes = {
    code: PropTypes.string.isRequired,
    currentSection: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    accessibleLabel: PropTypes.string.isRequired
};

export default class FormatItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
    // find the DOM element of the section, if it exists
        const sectionDom = document.querySelector(`#results-section-${this.props.code}`);
        if (sectionDom) {
            const sectionTop = sectionDom.offsetTop - 150;
            scrollToY(sectionTop, 250);
        }
    }

    render() {
        let activeClass = '';
        if (this.props.currentSection === this.props.code) {
            activeClass = ' active';
        }

        return (
            <button
                className={`format-item${activeClass}`}
                title={this.props.accessibleLabel}
                aria-label={this.props.accessibleLabel}
                onClick={this.clickedButton}>
                <div className="item-icon">
                    {this.props.icon}
                </div>
                <div className="item-label">
                    {this.props.label}
                </div>
            </button>
        );
    }
}

FormatItem.defaultProps = defaultProps;
FormatItem.propTypes = propTypes;
