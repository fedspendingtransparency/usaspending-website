/**
  * FederalAccountsSection.jsx
  * Created by Lizzie Salita 8/16/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FederalAccountsVizContainer from 'containers/awardV2/shared/FederalAccountsVizContainer';
import FederalAccountsSummaryContainer from 'containers/awardV2/shared/FederalAccountsSummaryContainer';
import Note from 'components/sharedComponents/Note';

import InfoToolTip from "../../shared/InfoTooltip";
import { federalAccountsInfo } from "../../shared/InfoTooltipContent";

const propTypes = {
    jumpToFederalAccountsHistory: PropTypes.func,
    idv: PropTypes.bool
};

export default class FederalAccountsSection extends React.Component {
    render() {
        const message = 'Result count may differ between treemap view and table view. Treemap view only displays accounts with a positive combined obligated amount, while table view displays all accounts.';
        const infoTooltip = this.props.idv ? (
            <InfoToolTip left wide>
                {federalAccountsInfo}
            </InfoToolTip>
        ) : null;
        return (
            <div className="award__col award-viz federal-accounts">
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon="chart-pie" />
                        </div>
                        <h3 className="award-viz__title">Federal Accounts</h3>
                        {infoTooltip}
                    </div>
                    <hr />
                    <FederalAccountsVizContainer />
                    <span className="federal-accounts__section--note">
                        <Note message={message} />
                    </span>
                    <FederalAccountsSummaryContainer
                        jumpToFederalAccountsHistory={this.props.jumpToFederalAccountsHistory} />
                </div>
            </div>
        );
    }
}

FederalAccountsSection.propTypes = propTypes;
