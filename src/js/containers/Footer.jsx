/**
 * Footer.jsx
 * Created by Brian Petway 04/14/23
 **/

import React from 'react';
import PropTypes from 'prop-types';

import DownloadBottomBarContainer from
    'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import BulkDownloadBottomBarContainer from
    'containers/bulkDownload/modal/BulkDownloadBottomBarContainer';
import StayInTouch from "../components/sharedComponents/StayInTouch";
import FooterContent from "../components/FooterContent";

const propTypes = {
    pageName: PropTypes.string.isRequired,
    filters: PropTypes.object
};

const Footer = ({
    pageName,
    filters
}) => (
    <footer>
        <DownloadBottomBarContainer filters={filters} />
        <BulkDownloadBottomBarContainer />
        <StayInTouch pageName={pageName} />
        <FooterContent />
    </footer>
);

Footer.propTypes = propTypes;

export default Footer;
