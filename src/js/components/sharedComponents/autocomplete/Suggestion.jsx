/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';

const propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    data: React.PropTypes.object,
    selected: React.PropTypes.bool,
    select: React.PropTypes.func
};

const defaultProps = {
    title: '',
    subtitle: '',
    data: []
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
                aria-selected={this.props.selected}
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
