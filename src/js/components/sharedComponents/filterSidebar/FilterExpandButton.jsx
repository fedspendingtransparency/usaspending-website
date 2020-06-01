/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { AngleRight, AngleDown } from 'components/sharedComponents/icons/Icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    hideArrow: PropTypes.bool,
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    // functional component!
    tooltip: PropTypes.func,
    disabled: PropTypes.bool,
    accessory: PropTypes.func,
    glossaryUrl: PropTypes.string,
    className: PropTypes.string
};

const ariaDescription = 'accessory-view';

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

        let glossaryLink = null;
        if (this.props.glossaryUrl) {
            glossaryLink = (
                <div className="filter-toggle__glossary">
                    <a href={this.props.glossaryUrl}><FontAwesomeIcon icon="book" /></a>
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
                    <div className={`filter-toggle__name ${this.props.className}`}>
                        <span>{this.props.name}</span>
                        {this.props.tooltip && <this.props.tooltip />}
                    </div>
                </button>
                {glossaryLink}
                <div className="filter-toggle__accessory">
                    {this.props.accessory && (
                        <div
                            tabIndex="0"
                            id="accessory-view"
                            role="toolbar">
                            <this.props.accessory />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

FilterExpandButton.propTypes = propTypes;
