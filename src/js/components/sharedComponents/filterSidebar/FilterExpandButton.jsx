/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { AngleRight, AngleDown, InfoCircle } from 'components/sharedComponents/icons/Icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    hideArrow: PropTypes.bool,
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    accessory: PropTypes.func,
    glossarySlug: PropTypes.string
};

export default class FilterExpandButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAccessory: false
        };

        this.showAccessory = this.showAccessory.bind(this);
        this.hideAccessory = this.hideAccessory.bind(this);
        this.toggleAccessory = this.toggleAccessory.bind(this);
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

    showAccessory() {
        this.setState({
            showAccessory: true
        });
    }

    hideAccessory() {
        this.setState({
            showAccessory: false
        });
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
            /* eslint-disable jsx-a11y/no-noninteractive-tabindex */

            accessoryIcon = (
                <div
                    className="filter-toggle__accessory-icon"
                    onMouseOver={this.showAccessory}
                    onMouseLeave={this.hideAccessory}
                    onFocus={this.showAccessory}
                    onBlur={this.hideAccessory}
                    onClick={this.toggleAccessory}
                    tabIndex={0}
                    aria-hidden="true">
                    <InfoCircle alt="More information" />
                </div>
            );
            /* eslint-enable jsx-a11y/no-static-element-interactions */
            /* eslint-enable jsx-a11y/no-noninteractive-tabindex */

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

        let glossaryLink = null;
        if (this.props.glossarySlug) {
            // TODO: add the search url hash
            glossaryLink = (
                <div className="filter-toggle__glossary">
                    <a href={`#/search/?glossary=${this.props.glossarySlug}`}><FontAwesomeIcon icon="book" /></a>
                </div>
            );
        }

        return (
            <div className="filter-toggle">
                <button
                    className={`filter-toggle__button ${hiddenClass}`}
                    onClick={this.props.toggleFilter}
                    disabled={this.props.disabled}
                    title={this.props.name}
                    aria-label={this.props.name}
                    aria-expanded={this.props.arrowState === 'expanded'}
                    aria-describedby={ariaDescription}>
                    {icon}
                    <div className="filter-toggle__name">
                        {this.props.name}
                    </div>
                    {glossaryLink}
                </button>
                <div className="filter-toggle__accessory">
                    {accessoryIcon}
                    {accessoryView}
                </div>
            </div>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
