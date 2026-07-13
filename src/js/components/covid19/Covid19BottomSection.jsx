/**
 * Covid19BottomSection.jsx
 * Created by JD House 05/11/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import DataSourcesAndMethodology from '../../components/covid19/DataSourcesAndMethodology';
import OtherResources from '../../components/covid19/OtherResources';
import Covid19LinkCardsSection from '../../components/covid19/Covid19LinkCardsSection';


const propTypes = {
    handleExternalLinkClick: PropTypes.func,
    publicLaw: PropTypes.string
};

const Covid19BottomSection = ({ handleExternalLinkClick, publicLaw }) => (
    <div className="bottom-section" >
        <section className="body__section" id="covid19-data_sources_and_methodology">
            <DataSourcesAndMethodology
                handleExternalLinkClick={handleExternalLinkClick}
                publicLaw={publicLaw} />
        </section>
        <section className="body__section" id="covid19-other_resources">
            <OtherResources
                handleExternalLinkClick={handleExternalLinkClick}
                publicLaw={publicLaw} />
            <Covid19LinkCardsSection />
        </section>
    </div>
);

Covid19BottomSection.propTypes = propTypes;
export default Covid19BottomSection;

