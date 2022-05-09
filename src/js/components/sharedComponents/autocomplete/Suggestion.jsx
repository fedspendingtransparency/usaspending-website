/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.object,
    selected: PropTypes.bool,
    select: PropTypes.func
};

const defaultProps = {
    title: '',
    subtitle: '',
    data: [],
    selected: false
};

export default class Suggestion extends React.Component {
    componentDidMount() {
        this.setUpSuggestion();
    }

    setUpSuggestion() {
        this.suggestion.addEventListener('mousedown', () => {
            this.props.select(this.props.data);
        });
    }

    render() {
        return (
        // We need to set aria-selected to use the arrow keys to select elements
        /* eslint-disable jsx-a11y/role-supports-aria-props */
            <li
                id={this.props.id}
                tabIndex={-1}
                aria-selected={this.props.selected}
                role="option"
                ref={(s) => {
                    this.suggestion = s;
                }}>
                <strong>{this.props.title}</strong><br />
                {this.props.subtitle}
            </li>
        /* eslint-enable jsx-a11y/role-supports-aria-props */
        );
    }
}

Suggestion.defaultProps = defaultProps;
Suggestion.propTypes = propTypes;
