/**
  * FederalAccountsSection.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FederalAccountsVizContainer from 'containers/awardV2/shared/FederalAccountsVizContainer';
import { getToolTipBySectionAndAwardType } from 'dataMapping/awardsv2/tooltips';
// eslint-disable-next-line max-len
import FederalAccountsSummaryContainer from 'containers/awardV2/shared/FederalAccountsSummaryContainer';
import Note from 'components/sharedComponents/Note';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import { AWARD_TYPE_PROPS } from '../../../../propTypes/index';

const propTypes = {
    jumpToFederalAccountsHistory: PropTypes.func,
    awardType: AWARD_TYPE_PROPS
};

// eslint-disable-next-line max-len
const message = 'Result count may differ between treemap view and table view. Treemap view only displays accounts with a positive combined obligated amount, while table view displays all accounts.';

const FederalAccountsSection = ({
    jumpToFederalAccountsHistory,
    awardType
}) => {
    const infoTooltip = getToolTipBySectionAndAwardType('federalAccounts', awardType);
    return (
        <AwardSection type="column" className="award-viz federal-accounts">
            <AwardSectionHeader
                icon={<FontAwesomeIcon size="lg" icon="chart-pie" />}
                title="Federal Accounts"
                tooltipWide
                tooltip={infoTooltip} />
            <div className="award__col__content">
                <FederalAccountsVizContainer />
                <span className="federal-accounts__section--note">
                    <Note message={message} />
                </span>
                <FederalAccountsSummaryContainer
                    jumpToFederalAccountsHistory={jumpToFederalAccountsHistory} />
            </div>
        </AwardSection>
    );
};

FederalAccountsSection.propTypes = propTypes;

export default FederalAccountsSection;
