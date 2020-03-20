import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CFDAVizContainer from 'containers/award/financialAssistance/CFDAVizContainer';
import Note from 'components/sharedComponents/Note';
import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";

const propTypes = {
    cfdas: PropTypes.array,
    CFDAOverviewLinkClicked: PropTypes.bool,
    updateCFDAOverviewLinkClicked: PropTypes.func
};

// eslint-disable-next-line max-len
const message = 'Result count may differ between treemap view and table view. Treemap view only displays accounts with a positive federal action obligation amount, while table view displays all accounts.';

const CFDASection = ({
    cfdas,
    CFDAOverviewLinkClicked,
    updateCFDAOverviewLinkClicked
}) => (
    <AwardSection id="award-cfda" type="column" className="cfda-section award-viz">
        <AwardSectionHeader
            title="CFDA Program / Assistance Listing Information"
            icon={<FontAwesomeIcon icon="hands-helping" />}
            tooltip={CFDASectionInfo}
            left={false}
            tooltipWide />
        <div className="award__col__content">
            <CFDAVizContainer
                cfdas={cfdas}
                CFDAOverviewLinkClicked={CFDAOverviewLinkClicked}
                updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked} />
            <span className="cfda-section__note">
                <Note message={message} />
            </span>
        </div>
    </AwardSection>
);

CFDASection.propTypes = propTypes;
export default CFDASection;
