/**
 * ResultItem.jsx
 * Created by Kevin Li 5/1/17
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    item: PropTypes.object,
    search: PropTypes.string,
    selectTerm: PropTypes.func
};

const ResultItem = (props) => {
    const [label, setLabel] = useState(null);

    const prepareLabel = () => {
        const value = props.item.term.toLowerCase();
        let labelLocal = null;
        if (!props.search || value.indexOf(props.search.toLowerCase()) === -1) {
            // nothing is being searched (or there are no matches), so nothing needs to be
            // highlighted
            labelLocal = props.item.term;
        }

        else {
            // there is a search value, so we need to highlight the matched parts
            const search = props.search.toLowerCase();

            // split the string up into parts based on the search term
            const parts = value.split(search);

            let position = 0;
            const output = [];
            parts.forEach((part, index) => {
                const unmatchedPos = position + part.length;
                if (part.length > 0) {
                    // add the unmatched parts of the label
                    const unmatched = props.item.term.substring(position, unmatchedPos);
                    output.push(
                        <span key={`unmatched-${index}`}>
                            {unmatched}
                        </span>
                    );
                }

                if (index < parts.length - 1) {
                    // add the matched parts of the label
                    const matchedPos = unmatchedPos + search.length;
                    const matchedValue = props.item.term.substring(unmatchedPos, matchedPos);
                    const matched = (
                        <span className="matched-highlight" key={`match-${index}`}>
                            {matchedValue}
                        </span>
                    );
                    output.push(matched);
                }

                position = unmatchedPos + search.length;
            });

            labelLocal = output;
        }

        setLabel(labelLocal);
    };

    const clickedLink = (term) => {
        props.selectTerm(props.item);
        Analytics.event({
            event: 'glossary-link',
            category: 'Glossary',
            action: `Clicked ${term.target.innerText}`
        });
    };


    useEffect(() => {
        prepareLabel(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (
        <li>
            <button
                className="glossary-link"
                onClick={clickedLink}>
                {label}
            </button>
        </li>
    );
};

ResultItem.propTypes = propTypes;
export default ResultItem;
