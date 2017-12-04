/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { AngleRight, AngleDown, InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideArrow: PropTypes.bool,
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    accessory: PropTypes.func
};

export default class FilterExpandButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAccessory: false
        };

        this.focusedElement = this.focusedElement.bind(this);
        this.blurredElement = this.blurredElement.bind(this);
        this.toggleAccessory = this.toggleAccessory.bind(this);
        this.enteredAccessory = this.enteredAccessory.bind(this);
        this.exitedAccessory = this.exitedAccessory.bind(this);
    }

    focusedElement() {
        if (!this.props.disabled && this.props.accessory && this.props.arrowState !== 'expanded') {
            this.setState({
                showAccessory: true
            });
        }
    }

    toggleAccessory() {
        this.setState({
            showAccessory: !this.state.showAccessory
        });
    }

    blurredElement() {
        if (!this.props.disabled && this.props.accessory) {
            this.setState({
                showAccessory: false
            });
        }
    }

    enteredAccessory() {
        if (!this.props.disabled && this.props.accessory) {
            this.setState({
                showAccessory: true
            });
        }
    }

    exitedAccessory() {
        if (!this.props.disabled && this.props.accessory) {
            this.setState({
                showAccessory: false
            });
        }
    }

    render() {
        let hiddenClass = '';
        if (this.props.hideArrow) {
            hiddenClass = ' hide';
        }

        let icon = <AngleRight />;
        if (this.props.arrowState === 'expanded') {
            icon = <AngleDown />;
        }

        let accessoryIcon = null;
        let accessoryView = null;
        if (this.props.accessory) {
            // We need to add this onClick for mobile tapping
            /* eslint-disable jsx-a11y/no-static-element-interactions */

            accessoryIcon = (
                <div
                    className="accessory-view"
                    onMouseEnter={this.enteredAccessory}
                    onMouseLeave={this.exitedAccessory}
                    onClick={this.toggleAccessory}>
                    <InfoCircle alt="More information" />
                </div>
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */

            if (this.state.showAccessory) {
                accessoryView = <this.props.accessory />;
            }
        }

        return (
            <button
                className={`filter-toggle ${hiddenClass}`}
                onClick={this.props.toggleFilter}
                disabled={this.props.disabled}
                onKeyUp={this.focusedElement}
                onBlur={this.blurredElement}>
                {icon}
                <h6 className="filter-header">{this.props.name}</h6>
                {accessoryIcon}
                {accessoryView}
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
