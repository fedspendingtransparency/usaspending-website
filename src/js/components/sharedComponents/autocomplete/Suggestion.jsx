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
    select: PropTypes.func
};

const defaultProps = {
    title: '',
    subtitle: '',
    data: [],
    selected: false
};

const Suggestion = (props) => {
    const suggestion = useRef();

    useEffect(() => {
        if (suggestion.current) {
            suggestion.current.addEventListener('mousedown', () => {
                props.select(props.data);
            });
        }
        return () => {
            if (suggestion.current) {
                suggestion.current.removeEventListener('mousedown', () => {
                    props.select(props.data);
                });
            }
        };
    }, [props, suggestion]);

    const isNewHeading = () => {
        let notFound = true;
        if (props.category) {
            const key = parseInt(props.id[props.id.length - 1], 10);
            const prevValues = props.values.slice(0, key);

            prevValues.forEach((value) => {
                if (value.category === props.category) {
                    notFound = false;
                }
            });
            console.log("new heading", props.category);
        }
        return notFound;
    };

    return (
    // We need to set aria-selected to use the arrow keys to select elements
    /* eslint-disable jsx-a11y/role-supports-aria-props */
        <>
            {isNewHeading() && props.category && <li className="autocomplete-heading">{locationDropdown[props.category]}</li>}
            <li
                id={props.id}
                tabIndex={-1}
                aria-selected={props.selected}
                role="option"
                ref={suggestion}>
                <span>{props.title}</span><br />
                {props.subtitle}
            </li>
        </>
    /* eslint-enable jsx-a11y/role-supports-aria-props */
    );
};

Suggestion.defaultProps = defaultProps;
Suggestion.propTypes = propTypes;
export default Suggestion;
