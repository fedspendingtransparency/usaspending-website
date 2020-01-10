import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const LoadingWrapper = ({
    msg = "Loading",
    isLoading,
    children
}) => {
    const [dots, updateDots] = useState("...");

    useEffect(() => {
        const t = setTimeout(() => {
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
        }, 350);

        return () => clearTimeout(t);
    }, [updateDots, dots]);

    if (isLoading) {
        return (
            <p className="loading">{`${msg}${dots}`}</p>
        );
    }

    return children;
};

LoadingWrapper.propTypes = {
    msg: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node
};
