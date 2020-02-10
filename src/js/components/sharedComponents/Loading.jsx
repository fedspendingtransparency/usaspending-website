import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line import/prefer-default-export
export const LoadingWrapper = ({
    msg = "Loading",
    isLoading,
    children
}) => {
    const [dots, updateDots] = useState("...");
    const timeouts = [];

    useEffect(() => {
        if (isLoading) {
            timeouts.push(setTimeout(() => {
                switch (dots.length) {
                    case 2:
                        updateDots("...");
                        break;
                    case 3:
                        updateDots("");
                        break;
                    case 0:
                        updateDots(".");
                        break;
                    default:
                        updateDots("..");
                        break;
                }
            }, 350));
        }

        if (!isLoading) timeouts.forEach((t) => clearTimeout(t));

        return () => timeouts.forEach((t) => clearTimeout(t));
    }, [updateDots, dots, timeouts, isLoading]);

    if (isLoading) {
        return (
            // Not spending too much time w/ styles here, will have scope to improve later.
            <div className="page__loading">
                <FontAwesomeIcon icon="spinner" spin size="lg" />
                <h4>{`${msg}${dots}`}</h4>
            </div>
        );
    }

    return children;
};

LoadingWrapper.propTypes = {
    msg: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node
};
