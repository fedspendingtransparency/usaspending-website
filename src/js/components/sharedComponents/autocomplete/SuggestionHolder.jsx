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
    autocompleteId: PropTypes.string,
    matchingString: PropTypes.string
};

const defaultProps = {
    suggestions: [],
    shown: false,
    selectedIndex: 0,
    maxSuggestions: 10
};

const SuggestionHolder = (props) => {
    const suggestions = [];

    // Ensure we're only showing maxSuggestions results at most
    for (let i = 0; i < Math.min(props.suggestions.length,
        props.maxSuggestions); i++) {
        suggestions.push(<Suggestion
            values={props.suggestions}
            category={props.suggestions[i].category}
            title={props.suggestions[i].title}
            subtitle={props.suggestions[i].subtitle}
            data={props.suggestions[i]}
            selected={i === props.selectedIndex}
            select={props.select}
            id={`${props.autocompleteId}__option_${i}`}
            key={i}
            matchingString={props.matchingString} />);
    }

    let hiddenClass = 'hide';
    if (props.shown && props.suggestions.length > 0) {
        hiddenClass = '';
    }
    return (
        <ul
            id={props.autocompleteId}
            className={`autocomplete ${hiddenClass}`}
            role="listbox">
            {suggestions}
        </ul>
    );
};

SuggestionHolder.defaultProps = defaultProps;
SuggestionHolder.propTypes = propTypes;
export default SuggestionHolder;
