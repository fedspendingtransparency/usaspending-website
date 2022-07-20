/**
 * IdvAwardAmountsSectionContainer.jsx
 * Created by David Trinh 2/8/2019
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { TooltipWrapper, Tabs } from 'data-transparency-ui';
import { flowRight } from 'lodash';

import * as IdvHelper from 'helpers/idvHelper';
import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import BaseAwardAmounts from 'models/v2/award/BaseAwardAmounts';

import AggregatedAwardAmounts from 'components/award/idv/amounts/AggregatedAwardAmountsSection';
import { awardAmountsInfo } from 'components/award/shared/InfoTooltipContent';
import withDefCodes from 'containers/covid19/WithDefCodes';
import AggregatedAwardAmountsTableWrapper
    from "../../../components/award/idv/amounts/AggregatedAwardAmountsTableWrapper";

const propTypes = {
    award: PropTypes.object,
    setIdvDetails: PropTypes.func,
    jumpToSection: PropTypes.func,
    defCodes: PropTypes.array,
    refDefCodes: PropTypes.array
};

const tabTypes = [
    {
        enabled: true,
        internal: 'awards',
        label: 'Awards Under this IDV'
    },
    {
        enabled: true,
        internal: 'idv',
        label: 'This IDV'
    }
];

export class IdvAmountsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;

        this.state = {
            error: false,
            inFlight: true,
            awardAmounts: null,
            active: 'awards'
        };
        this.switchTab = this.switchTab.bind(this);
    }

    componentDidMount() {
        return this.getIdvChildAwardAmounts(this.props.award.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.id !== prevProps.award.id) {
            this.getIdvChildAwardAmounts(this.props.award.id);
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getIdvChildAwardAmounts(id) {
        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }

        this.awardRequest = IdvHelper.fetchAwardAmounts(id);

        return this.awardRequest.promise
            .then((res) => {
                this.parseChildAwardAmounts(res.data);

                // operation has resolved
                this.awardRequest = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    this.awardRequest = null;
                    this.setState({
                        error: true,
                        inFlight: false
                    });
                }
                else {
                    // Request failed
                    this.awardRequest = null;
                    console.log(error);
                }
            });
    }

    parseChildAwardAmounts(data) {
        const awardAmounts = Object.create(BaseAwardAmounts);
        awardAmounts.populate(data, 'idv_aggregated', this.props.refDefCodes);
        this.setState({
            awardAmounts,
            error: false,
            inFlight: false
        });

        // Store the counts in Redux for use in the referenced awards table
        // and related awards section
        this.props.setIdvDetails({
            // api currently returns only defc associated with covid19
            child_file_c: IdvHelper.getChildAwardFileCDetails(data),
            child_awards: data.child_award_count,
            child_idvs: data.child_idv_count,
            grandchild_awards: data.grandchild_award_count,
            total: data.child_idv_count + data.child_award_count + data.grandchild_award_count
        });
    }

    switchTab(tab) {
        this.setState({
            active: tab
        });
    }

    render() {
        const thisIdv = Object.create(BaseAwardAmounts);
        thisIdv.populate(this.props.award.overview, 'idv', this.props.refDefCodes);
        const tabsClassName = 'idv-award-amounts-tabs';
        const thisIdvHasFileC = (
            thisIdv._fileCObligated !== 0 ||
            thisIdv._fileCOutlay !== 0
        );

        const childAwardsHaveFileC = (
            this.state.awardAmounts?._fileCObligated !== 0 ||
            this.state.awardAmounts?._fileCOutlay !== 0
        );

        const showFileC = (thisIdvHasFileC || childAwardsHaveFileC);

        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">$ Award Amounts</h3>
                    <TooltipWrapper
                        className="award-section-tt"
                        icon="info"
                        wide
                        tooltipComponent={awardAmountsInfo} />
                </div>
                <hr />
                <div className="award-viz__tabs">
                    <Tabs
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab}
                        tabsClassName={tabsClassName} />
                </div>
                {this.state.active === 'awards' && (
                    <AggregatedAwardAmounts
                        {...this.state}
                        jumpToSection={this.props.jumpToSection}
                        showFileC={showFileC} />
                )}
                {this.state.active !== 'awards' && (
                    <AggregatedAwardAmountsTableWrapper
                        showFileC={showFileC}
                        awardData={thisIdv}
                        awardAmountType="idv"
                        spendingScenario={determineSpendingScenarioByAwardType("idv", thisIdv)} />
                )}
            </div>
        );
    }
}

IdvAmountsContainer.propTypes = propTypes;

export default flowRight(
    withDefCodes,
    connect(
        (state) => ({
            award: state.award,
            refDefCodes: state?.covid19?.defCodes
        }),
        (dispatch) => bindActionCreators(awardActions, dispatch)
    )
)(IdvAmountsContainer);
