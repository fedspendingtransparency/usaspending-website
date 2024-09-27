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
    select: PropTypes.func,
    matchingString: PropTypes.string
};

const defaultProps = {
    title: '',
    subtitle: '',
    data: [],
    selected: false,
    matchingString: null
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

    boldedText(text, shouldBeBold) {
        const textArray = text.split(RegExp(shouldBeBold, "ig"));
        const match = text.match(RegExp(shouldBeBold, "ig"));

        return (
            textArray.map((item, index) => (
                <>
                    {item}
                    {index !== textArray.length - 1 && match && (
                        <span className="semibold">{match[index]}</span>
                    )}
                </>
            ))
        );
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
                <span>{this.boldedText(this.props.title, this.props.matchingString)}</span><br />
                {this.boldedText(this.props.subtitle, this.props.matchingString)}
            </li>
        /* eslint-enable jsx-a11y/role-supports-aria-props */
        );
    }
}

Suggestion.defaultProps = defaultProps;
Suggestion.propTypes = propTypes;
