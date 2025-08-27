/**
 * Created by michaelbray on 1/27/17.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { locationDropdown } from "../../../dataMapping/search/location";

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.object,
    selected: PropTypes.bool,
    select: PropTypes.func,
    matchingString: PropTypes.string
};

const Suggestion = ({
    id,
    title = '',
    subtitle = '',
    data = [],
    selected = false,
    select,
    matchingString = null,
    category,
    values
}) => {
    const suggestion = useRef();

    useEffect(() => {
        if (suggestion.current) {
            suggestion.current.addEventListener('mousedown', () => {
                select(data);
            });
        }
        return () => {
            if (suggestion.current) {
                suggestion.current.removeEventListener('mousedown', () => {
                    select(data);
                });
            }
        };
    }, [data, select, suggestion]);

    const isNewHeading = () => {
        let notFound = true;
        if (category) {
            const key = parseInt(id[id.length - 1], 10);
            const prevValues = values.slice(0, key);

            prevValues.forEach((value) => {
                if (value.category === category) {
                    notFound = false;
                }
            });
        }
        return notFound;
    };

    const boldedText = (text, shouldBeBold) => {
        const textArray = text?.split(RegExp(shouldBeBold, "ig"));
        const match = text?.match(RegExp(shouldBeBold, "ig"));

        return (
            textArray?.map((item, index) => (
                <span key={`item: ${item}-${index}`}>
                    {item}
                    {index !== textArray.length - 1 && match && (
                        <span className="semibold">{match[index]}</span>
                    )}
                </span>
            ))
        );
    };

    return (
    // We need to set aria-selected to use the arrow keys to select elements
    /* eslint-disable jsx-a11y/role-supports-aria-props */
        <>
            {isNewHeading() && category &&
                <li className="autocomplete-heading">{locationDropdown[category]}</li>
            }
            <li
                id={id}
                tabIndex={-1}
                aria-selected={selected}
                role="option"
                ref={suggestion}>
                <span key={id}>{boldedText(title, matchingString)}</span><br />
                {boldedText(subtitle, matchingString)}
            </li>
        </>
    /* eslint-enable jsx-a11y/role-supports-aria-props */
    );
};

Suggestion.propTypes = propTypes;
export default Suggestion;
