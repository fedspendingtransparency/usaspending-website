import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import FederalAccountsVizContainer from 'containers/award/shared/FederalAccountsVizContainer';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";
import SingleCFDA from './SingleCFDA';
import CFDAVizContainer from './CFDAVizContainer';

{/* <SingleCFDA data={overview.biggestCfda} /> */}

const propTypes = {
    cfdas: PropTypes.array,
    biggestCfda: PropTypes.object
};

const CFDASection = ({
    cfdas,
    biggestCfda
}) => (
    <AwardSection type="column" className="cfda-section award-viz">
        <AwardSectionHeader
            title="CFDA Program / Assistance Listing Information"
            icon={<FontAwesomeIcon icon="hands-helping" />}
            tooltip={CFDASectionInfo}
            left={false}
            tooltipWide />
        <div className="award__col__content">
            <CFDAVizContainer
                cfdas={cfdas}
                biggestCfda={biggestCfda} />
        </div>
    </AwardSection>
);

CFDASection.propTypes = propTypes;
export default CFDASection;
