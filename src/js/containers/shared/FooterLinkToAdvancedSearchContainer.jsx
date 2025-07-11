/**
 * AgencyFooterContainer.jsx -> FooterLinkToAdvancedSearchContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import { resetAppliedFilters } from 'redux/actions/search/appliedFilterActions';
import FooterLinkToAdvancedSearch from 'components/sharedComponents/FooterLinkToAdvancedSearch';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func
};

const FooterLinkToAdvancedSearchContainer = ({
    title, description, onClick
}) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const clickedSearch = () => {
        dispatch(clearAllFilters());
        dispatch(resetAppliedFilters());
        if (onClick) onClick();
        history('/search');
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
