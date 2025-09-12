/**
 * GlossarySearchResults.jsx
 * Created by Kevin Li 5/1/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { concat, sortBy } from 'lodash-es';
import Analytics from 'helpers/analytics/Analytics';

import ResultGroup from './ResultGroup';

const propTypes = {
    glossary: PropTypes.object,
    searchLoading: PropTypes.bool,
    setGlossaryTerm: PropTypes.func
};

const GlossarySearchResults = (props) => {
    const [results, setResults] = useState([]);

    const logGlossaryTermEvent = (term) => {
        Analytics.event({
            event: 'glossary-link',
            category: 'Glossary',
            action: 'Clicked Glossary Term',
            label: term
        });
    };

    const selectTerm = (term) => {
        props.setGlossaryTerm(term);

        // Analytics
        logGlossaryTermEvent(term.term);
    };

    const groupResults = () => {
    // we need to group the results by their starting letter
        const groups = {};

        props.glossary.search.results.forEach((result) => {
            const startingLetter = result.term.charAt(0).toUpperCase();
            // check if we already have the character
            if (Object.hasOwnProperty.call(groups, startingLetter)) {
                // we do, add it to the list
                const groupValues = concat([], groups[startingLetter].terms, result);
                groups[startingLetter].terms = sortBy(groupValues, ['term']);
            }
            else {
                // the character doesn't exist as a group item yet
                const group = {
                    letter: startingLetter,
                    terms: [result]
                };
                groups[startingLetter] = group;
            }
        });

        // sort the groups by starting letter
        const orderedGroups = sortBy(groups, ['letter']);

        const resultsLocal = orderedGroups.map((group) => (
            <ResultGroup
                key={group.letter}
                title={group.letter}
                items={group.terms}
                search={props.glossary.search.input}
                selectTerm={selectTerm} />
        ));

        setResults(resultsLocal);
    };

    useEffect(() => {
        groupResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.glossary.search.results]);

    let searchLoading = '';
    if (props.searchLoading) {
        searchLoading = ' loading';
    }

    return (
        <div className={`glossary-search-results ${searchLoading}`}>
            {results}
        </div>
    );
};

GlossarySearchResults.propTypes = propTypes;
export default GlossarySearchResults;
