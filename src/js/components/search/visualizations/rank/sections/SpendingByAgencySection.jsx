/**
 * SpendingByAgencySection.jsx
 * Created by Kevin Li 5/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";

import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';
import GlossaryLink from '../../../../sharedComponents/GlossaryLink';
import ReadMore from '../../../../sharedComponents/ReadMore';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func,
    hideSuboptionBar: PropTypes.string,
    subward: PropTypes.bool
};

const defaultProps = {
    hideSuboptionBar: ""
};

export default class SpendingByAgencySection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: null
        };
    }

    componentDidUpdate() {
        if (!this.state.expanded || this.state.expanded === null) {
            const elem = document.querySelector(".read-more__preview-lines");
            elem?.classList.add("line-clamp");
        }
    }
    render() {
        const applyLineClamp = (elem) => {
            elem.classList.add("line-clamp");
        };

        const removeLineClamp = (elem) => {
            elem.classList.remove("line-clamp");
        };

        const additionalFunctionality = (expanded) => {
            const elem = document.querySelector(".read-more__preview-lines");
            this.setState({ expanded: !expanded });
            if (!expanded) {
                removeLineClamp(elem);
            }
            else {
                applyLineClamp(elem);
            }
        };
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-top__description">
                        <p className="award-search__what-title">What's included in this view of the data?</p>

                        <p className="read-more__preview-lines">View a list of the top Agencies from highest to lowest.
                            View your results by Awarding Agency, Sub Agency, or Office, and hover over the bars
                            for more detailed information.
                        </p>
                        {this.props.subaward ?
                            <ReadMore openPrompt="read more" closePrompt="read less" openIcon="" closeIcon="" additionalFunctionality={additionalFunctionality}>
                                <>
                                    {getAtdDefcText(this.props.isDefCodeInFilter?.length > 0)}
                                    <p className="award-search__body-text">The data below represent{<span className="award-search__glossary-term"> sub-awards</span>}{' '}{<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not reflect sub-awards whose
                                        {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink term="prime-award" />}{' '}
            meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019.
                                    </p>
                                    <p className="award-search__body-text">
            Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                                    </p>
                                </>
                            </ReadMore> :
                            <ReadMore openPrompt="read more" closePrompt="read less" openIcon="" closeIcon="" additionalFunctionality={additionalFunctionality}>
                                <>
                                    {getAtdDefcText(this.props.isDefCodeInFilter?.length > 0)}
                                    <p className="award-search__body-text">The data in the chart below represent <span className="award-search__glossary-term"> obligation</span>{' '}<GlossaryLink term="obligation" /> amounts for prime award <span className="award-search__glossary-term"> transactions</span>{' '}<GlossaryLink term="transaction" /> within the selected filters. Prime award transactions with the same unique award ID are grouped under a single prime award summary. Prime award summaries can be viewed in the Table tab.</p>
                                </>
                            </ReadMore>
                        }
                    </div>
                    <div className={`visualization-scope ${this.props.hideSuboptionBar}`}>
                        <RankVisualizationScopeButton
                            value="awarding_agency"
                            label="Agencies"
                            active={this.props.scope === 'awarding_agency'}
                            changeScope={this.props.changeScope} />
                        <RankVisualizationScopeButton
                            value="awarding_subagency"
                            label="Sub-Agencies"
                            active={this.props.scope === 'awarding_subagency'}
                            changeScope={this.props.changeScope} />
                        <div className="coming-soon">
                            <RankVisualizationScopeButton
                                value="office"
                                label="Offices"
                                active={this.props.scope === 'office'}
                                changeScope={this.props.changeScope}
                                disabled />
                            <ComingSoonLabel />
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByAgencySection.propTypes = propTypes;
SpendingByAgencySection.defaultProps = defaultProps;
