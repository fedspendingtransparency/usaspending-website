/**
 * AgencyFooterContainer.jsx -> FooterLinkToAdvancedSearchContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Router from 'containers/router/Router';
import { clearAllFilters } from 'redux/actions/search/searchFilterActions';
import FooterLinkToAdvancedSearch from 'components/sharedComponents/FooterLinkToAdvancedSearch';

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

const FooterLinkToAdvancedSearchContainer = ({ title, description }) => {
    const dispatch = useDispatch();
    const clickedSearch = () => {
        dispatch(clearAllFilters());
        Router.history.push('/search');
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
