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
        let ariaDescription = null;
        if (this.props.accessory) {
            // We need to add this onClick for mobile tapping
            /* eslint-disable jsx-a11y/no-static-element-interactions */

            accessoryIcon = (
                <div
                    className="accessory-view"
                    onMouseEnter={this.enteredAccessory}
                    onMouseLeave={this.exitedAccessory}
                    onClick={this.toggleAccessory}
                    aria-hidden="true">
                    <InfoCircle alt="More information" />
                </div>
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */

            ariaDescription = 'accessory-view';

            if (this.state.showAccessory) {
                accessoryView = (
                    <div
                        id="accessory-view"
                        role="toolbar">
                        <this.props.accessory />
                    </div>
                );
            }
        }

        return (
            <button
                className={`filter-toggle ${hiddenClass}`}
                onClick={this.props.toggleFilter}
                disabled={this.props.disabled}
                onKeyUp={this.focusedElement}
                onBlur={this.blurredElement}
                title={this.props.name}
                aria-label={this.props.name}
                aria-expanded={this.props.arrowState === 'expanded'}
                aria-describedby={ariaDescription}>
                {icon}
                <h3 className="filter-header">{this.props.name}</h3>
                {accessoryIcon}
                {accessoryView}
            </button>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
