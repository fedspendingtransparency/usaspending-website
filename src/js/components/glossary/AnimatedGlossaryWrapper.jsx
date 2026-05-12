/**
 * AnimatedGlossaryWrapper.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Glossary from './Glossary';

const propTypes = {
    glossary: PropTypes.object,
    glossaryResults: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    searchLoading: PropTypes.bool,
    performSearch: PropTypes.func
};

const AnimatedGlossaryWrapper = ({
    glossary, glossaryResults, loading, error, searchLoading, performSearch
}) => {
    const [zIndexClass, setZIndexClass] = useState(null);

    const { lastOpenedSlideout } = useSelector((state) => state.slideouts);

    useEffect(() => {
        setZIndexClass(lastOpenedSlideout === 'glossary' ? 'z-index-plus-one' : 'z-index');
    }, [lastOpenedSlideout]);

    return (
        <div className="usa-da-glossary-animations">
            <Glossary
                glossary={glossary}
                glossaryResults={glossaryResults}
                loading={loading}
                error={error}
                searchLoading={searchLoading}
                performSearch={performSearch}
                zIndexClass={zIndexClass} />
        </div>
    );
};

AnimatedGlossaryWrapper.propTypes = propTypes;
export default AnimatedGlossaryWrapper;

