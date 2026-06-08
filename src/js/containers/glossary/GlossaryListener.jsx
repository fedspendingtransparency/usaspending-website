import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { showGlossary, setTermFromUrl } from '../../redux/actions/glossary/glossaryActions';
import { setLastOpenedSlideout } from '../../redux/actions/slideouts/slideoutActions';
import useQueryParams from "../../hooks/useQueryParams";

const GlossaryListener = ({
    Child
}) => {
    const { search } = useLocation();
    const queryParams = useQueryParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (search.includes('glossary')) {
            const { glossary: term } = queryParams;
            dispatch(showGlossary());
            dispatch(setTermFromUrl(term));
            dispatch(setLastOpenedSlideout('glossary'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return <Child />;
};

GlossaryListener.propTypes = {
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

export default GlossaryListener;
