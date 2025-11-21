/**
 * AboutTheDataListener.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { showSlideout } from '../../helpers/slideoutHelper';
import useQueryParams from "../../hooks/useQueryParams";

const AboutTheDataListener = ({
    history,
    match,
    location,
    Child
}) => {
    const { search } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        if (search.includes('about-the-data')) {
            const { "about-the-data": term } = queryParams;
            showSlideout('atd', { url: term });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history?.location?.search]);

    return <Child {...{ history, match, location }} />;
};

AboutTheDataListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

export default AboutTheDataListener;
