/**
  * AwardInfo.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import TablesSection from './TablesSection';
import InfoTooltip from './InfoTooltip';

const propTypes = {
    overview: PropTypes.object
};

export default class AwardHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "transaction"
        };

        this.clickTab = this.clickTab.bind(this);
    }

    clickTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        return (
            <div className="award-viz award-history">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <AwardLoop alt="Award History" />
                    </div>
                    <h3 className="award-viz__title">
                        Award History for this IDV
                    </h3>
                    <InfoTooltip left>
                        <div className="info-tooltip__title">
                            Award History
                        </div>
                        <div className="info-tooltip__text">
                            <p>
                                <strong>Transaction History</strong> – This table contains historical changes made to this award, shown as individual modification records. This information is reported by the Awarding Agency&apos;s contracting office.
                            </p>
                            <p>
                                <strong>Federal Account Funding</strong> – The data documenting the funding, or the actual transactions made my an agency to obligate money, of an award can be found in this table. This data comes from the Awarding Agency&apos;s financial accounting offices.
                            </p>
                        </div>
                    </InfoTooltip>
                </div>
                <hr />
                <TablesSection
                    overview={this.props.overview}
                    clickTab={this.clickTab}
                    activeTab={this.state.activeTab} />
            </div>
        );
    }
}
AwardHistory.propTypes = propTypes;

