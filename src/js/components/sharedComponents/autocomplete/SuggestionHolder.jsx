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

const SuggestionHolder = ({
    select,
    suggestions = [],
    selectedIndex = 0,
    maxSuggestions = 10,
    shown = false,
    autocompleteId,
    matchingString
}) => {
    const suggestionsArray = [];

    // Ensure we're only showing maxSuggestions results at most
    for (let i = 0; i < Math.min(suggestions.length,
        maxSuggestions); i++) {
        suggestionsArray.push(<Suggestion
            values={suggestions}
            category={suggestions[i].category}
            title={suggestions[i].title}
            subtitle={suggestions[i].subtitle}
            data={suggestions[i]}
            selected={i === selectedIndex}
            select={select}
            id={`${autocompleteId}__option_${i}`}
            key={i}
            matchingString={matchingString} />);
    }

    let hiddenClass = 'hide';
    if (shown && suggestions.length > 0) {
        hiddenClass = '';
    }
    return (
        <ul
            id={autocompleteId}
            className={`autocomplete ${hiddenClass}`}
            role="listbox">
            {suggestionsArray}
        </ul>
    );
};

SuggestionHolder.propTypes = propTypes;

export default SuggestionHolder;
