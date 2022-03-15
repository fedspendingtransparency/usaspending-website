/**
 * SpendingByRecipientSection.jsx
 * Created by michaelbray on 4/27/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func
};

export default class SpendingByRecipientSection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-top__description">
                        View a list of the top Recipients from highest to lowest.
                        View your results by Parent Recipient or Recipient,
                        and hover over the bars for more detailed information.
                    </div>
                    <div className="visualization-scope">
                        <div className="coming-soon">
                            <RankVisualizationScopeButton
                                value="recipient_parent_duns"
                                label="Parent Recipient"
                                active={this.props.scope === 'recipient_parent_duns'}
                                changeScope={this.props.changeScope}
                                disabled />
                            <ComingSoonLabel />
                        </div>
                        <RankVisualizationScopeButton
                            value="recipient"
                            label="Recipient"
                            active={this.props.scope === 'recipient'}
                            changeScope={this.props.changeScope} />
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByRecipientSection.propTypes = propTypes;
