/**
 * AgencyFooter.jsx -> FooterLinkToAdvancedSearch.jsx
 * Created by Kevin Li 6/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    clickedSearch: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string
};

const FooterLinkToAdvancedSearch = ({
    clickedSearch,
    title,
    description
}) => (
    <div className="footerLinkToAdvancedSearch">
        <div className="footerLinkToAdvancedSearch__content">
            <h4>{title}</h4>
            <p>
                Check out the <strong>Award Search</strong> page <br />
                {description}
            </p>
            <button
                className="footerLinkToAdvancedSearch__button"
                onClick={clickedSearch}>
                Let&#39;s go!
            </button>
        </div>
    </div>
);

FooterLinkToAdvancedSearch.propTypes = propTypes;
export default FooterLinkToAdvancedSearch;
