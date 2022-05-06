/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Suggestion from './Suggestion';

const propTypes = {
    select: PropTypes.func,
    suggestions: PropTypes.array,
    selectedIndex: PropTypes.number,
    maxSuggestions: PropTypes.number,
    shown: PropTypes.bool,
    autocompleteId: PropTypes.string
};

const defaultProps = {
    suggestions: [],
    shown: false,
    selectedIndex: 0,
    maxSuggestions: 10
};

export default class SuggestionHolder extends React.Component {
    render() {
        const suggestions = [];

        // Ensure we're only showing maxSuggestions results at most
        for (let i = 0; i < Math.min(this.props.suggestions.length,
            this.props.maxSuggestions); i++) {
            suggestions.push(<Suggestion
                title={this.props.suggestions[i].title}
                subtitle={this.props.suggestions[i].subtitle}
                data={this.props.suggestions[i]}
                selected={i === this.props.selectedIndex}
                select={this.props.select}
                id={`${this.props.autocompleteId}__option_${i}`}
                key={i} />);
        }

        let hiddenClass = 'hide';
        if (this.props.shown && this.props.suggestions.length > 0) {
            hiddenClass = '';
        }

        return (
            <ul
                id={this.props.autocompleteId}
                className={`autocomplete ${hiddenClass}`}
                role="listbox">
                {suggestions}
            </ul>
        );
    }
}

SuggestionHolder.defaultProps = defaultProps;
SuggestionHolder.propTypes = propTypes;
