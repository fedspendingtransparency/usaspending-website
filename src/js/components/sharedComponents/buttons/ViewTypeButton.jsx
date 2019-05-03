/**
 * ViewTypeButton.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    changeView: PropTypes.func
};

const defaultProps = {
    disabled: false
};

export default class ViewTypeButton extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.changeView(this.props.value);
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = ' active';
        }

        let description = `Show results in a ${this.props.label.toLowerCase()}`;
        if (this.props.active) {
            description += ' (currently selected)';
        }

        return (
            <button
                className={`view-button${activeClass}`}
                value={this.props.value}
                title={description}
                aria-label={description}
                onClick={this.clickedButton}
                disabled={this.props.disabled}>
                <div className="icon">
                    {this.props.icon}
                </div>
            </button>
        );
    }
}

ViewTypeButton.propTypes = propTypes;
ViewTypeButton.defaultProps = defaultProps;
