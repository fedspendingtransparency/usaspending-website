/**
 * AgencyFooterContainer.jsx -> FooterLinkToAdvancedSearchContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { resetAppliedFilters } from 'redux/actions/search/appliedFilterActions';
import FooterLinkToAdvancedSearch from 'components/sharedComponents/FooterLinkToAdvancedSearch';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
    history: PropTypes.object
};

const FooterLinkToAdvancedSearchContainer = ({
    title, description, onClick, history
}) => {
    const dispatch = useDispatch();
    const clickedSearch = () => {
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        if (onClick) onClick();
        history.push('/search');
    };

    return (
        <FooterLinkToAdvancedSearch
            clickedSearch={clickedSearch}
            title={title}
            description={description} />
    );
};

FooterLinkToAdvancedSearchContainer.propTypes = propTypes;
export default FooterLinkToAdvancedSearchContainer;
