/**
 * StateOverview.jsx
 * Created by Lizzie Salita 5/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { REQUEST_VERSION } from "GlobalConstants";
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import { isCancel } from 'axios';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AwardBreakdownContainer from 'containers/state/visualizations/awardBreakdown/AwardBreakdownContainer';
import GeoVisualizationSectionContainer from 'containers/state/visualizations/geo/GeoVisualizationSectionContainer';
import { CardContainer, SectionHeader, CardBody, CardButton, CardHero, FlexGridRow, FlexGridCol } from "data-transparency-ui";
import DetailsTooltip from './DetailsTooltip';
import SummaryStats from './SummaryStats';
import { generateUrlHash } from "../../../helpers/searchHelper";
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    stateProfile: PropTypes.object
};

export default class StateOverview extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hideFlag: true,
            flag: '',
            showInfoTooltip: false,
            open: false,
            toggle: false
        };

        this.detailsHeight = document.getElementById("award")?.offsetHeight;
        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onKeyToggle = this.onKeyToggle.bind(this);
    }

    componentDidMount() {
        this.prepareOverview(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateProfile.id !== this.props.stateProfile.id) {
            this.prepareOverview(this.props);
        }
    }

    onToggle = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    };

    onKeyToggle = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                toggle: !this.state.toggle
            });
        }
    };

    setOpen = () => {
        this.setState({
            open: !this.state.open
        });
    };

    prepareOverview(props) {
        let flag = null;
        let hideFlag = 'hide';
        if (props.stateProfile.flag !== '') {
            hideFlag = '';
            flag = (<img
                src={props.stateProfile.flag}
                alt={props.stateProfile.name} />);
        }

        this.setState({
            flag,
            hideFlag
        });
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        }, () => {
            const closeButton = document.querySelector('#state-overview-tooltip__close_icon');
            if (closeButton) {
                closeButton.focus();
            }
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    render() {
        let populationSourceYear = '';
        let incomeSourceYear = '';

        const usaCode = `USA_${this.props.stateProfile.code}`;
        const getSelectedHash = (stateProfile) => {
            const filterValue = {
                filters: {
                    ...defaultFilters,
                    selectedLocations: {
                        usaCode: {
                            filter: {
                                state: stateProfile.code,
                                country: "USA"
                            },
                            display: {
                                title: stateProfile.name,
                                entity: stateProfile.type.charAt(0).toUpperCase() + stateProfile.type.slice(1),
                                standalone: stateProfile.name
                            },
                            identifier: usaCode
                        }
                    }
                },
                version: REQUEST_VERSION
            };

            let tempHash = generateUrlHash(filterValue);
            tempHash.promise
                .then((results) => {
                    const hashData = results.data;
                    window.open(`/search/?hash=${hashData.hash}`, '_blank');
                    // operation has resolved
                    tempHash = null;
                })
                .catch((error) => {
                    console.log(error);
                    if (isCancel(error)) {
                        // Got cancelled
                    }
                    else if (error.response) {
                        // Errored out but got response, toggle noAward flag
                        this.hash = null;
                    }
                    else {
                        // Request failed
                        tempHash = null;
                        console.log(error);
                    }
                });
        };
        const handleGoToAdvancedSearch = (e) => {
            e?.preventDefault();
            getSelectedHash(this.props.stateProfile);
        };
        if ((this.props.stateProfile.population !== "--") && this.props.stateProfile.populationSourceYear) {
            populationSourceYear = `(${this.props.stateProfile.populationSourceYear} est.)`;
        }
        if ((this.props.stateProfile.medianHouseholdIncome !== "--") && this.props.stateProfile.incomeSourceYear) {
            incomeSourceYear = `(${this.props.stateProfile.incomeSourceYear} est.)`;
        }

        let tooltip = null;
        if (this.state.showInfoTooltip) {
            tooltip = (
                <DetailsTooltip
                    showInfoTooltip={this.state.showInfoTooltip}
                    closeTooltip={this.closeTooltip} />
            );
        }

        return (
            <div
                id="state-overview"
                className="state-section state-overview">
                <div className="state-overview__title-wrapper">
                    <div className={`state-overview__flag ${this.state.hideFlag}`}>
                        {this.state.flag}
                    </div>
                    <h2 className="state-overview__title">{this.props.stateProfile.name}</h2>
                </div>
                <SectionHeader
                    icon={<FontAwesomeIcon icon="map-marker-alt" size="2x" />}
                    title="Overview"
                    titleTooltip={{ component: false }}
                    descTooltip={{ component: false }} />
                <hr className="results-divider" />
                <div className="state-overview__content">
                    <div className="state-overview__note">
                        <strong>Note:</strong> All data on this page is based on Primary Place of Performance.
                    </div>
                    <div className="state-section__row">
                        <SummaryStats stateProfile={this.props.stateProfile} />
                    </div>
                    <FlexGridRow>
                        <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                            <div className="state-section__viz award-breakdown" id="award">
                                <div className="award-breakdown__heading-row">
                                    <h3 className="state-overview__heading">
                                        Award Breakdown
                                    </h3>
                                    <div className="state-overview__heading-right-side">
                                        <RoundedToggle toggle={this.state.toggle} onKeyToggle={this.onKeyToggle} onToggle={this.onToggle} label="View Outlays" />
                                        <div className="state-overview__line-div" />
                                        <Accordion setOpen={this.setOpen} closedIcon="chevron-down" openIcon="chevron-up" title="What is this?" />
                                    </div>
                                </div>
                                {this.state.open &&
                                    <div className="state-overview__what-content">
                                        <FontAwesomeIcon icon="info-circle" className="state-overview__info-icon" />
                                        <p className="state-overview__what-heading">What is an outlay?</p>
                                        <p className="state-overview__what-text">An <span className="state-overview__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state-overview__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.</p>
                                        <p className="state-overview__what-second-heading">
                                            How do outlays relate to the chart below?
                                        </p>
                                        <p className="state-overview__what-text">
                                            The chart below can be filtered to view outlayed amounts for each award type.
                                            Please note that outlay amounts displayed below may have been paying off
                                            obligations that occurred in a prior year, which is why obligations and outlays
                                            from a single year are not comparable.
                                        </p>
                                    </div>}
                            </div>
                        </FlexGridCol>
                    </FlexGridRow>
                    <FlexGridRow>
                        <FlexGridCol width={8} desktop={8} tablet={12} mobile={12}>
                            <div className="state-section__viz award-breakdown" id="award">
                                <AwardBreakdownContainer toggleState={this.state.toggle} />
                            </div>
                        </FlexGridCol>
                        <FlexGridCol width={4} desktop={4} tablet={12} mobile={12}l>
                            <div className="state-section__viz details state-overview__heading">
                                <CardContainer variant="outline" size="md">
                                    <CardHero fill="#005ea2" />
                                    <CardBody
                                        customClassName="details-card-body"
                                        headline={
                                            <div className="state-section__viz">
                                                <h3 className="state-overview__heading">
                                                    Details
                                                    <span className="details__info_icon_holder">
                                                        <button
                                                            id="details__info_icon"
                                                            className="details__info_icon"
                                                            onFocus={this.showTooltip}
                                                            onBlur={this.closeTooltip}
                                                            onMouseEnter={this.showTooltip}
                                                            onClick={this.showTooltip}>
                                                            <InfoCircle />
                                                        </button>
                                                    </span>
                                                </h3>
                                                {tooltip}
                                            </div>
                                        }
                                        text={
                                            <div className="details-info">
                                                <div className="details-header">Count</div>
                                                <div className="details-text">{this.props.stateProfile.population} {populationSourceYear}</div>
                                                <div className="details-header">Obligations Per Capita</div>
                                                <div className="details-text">{this.props.stateProfile.awardAmountPerCapita}</div>
                                                <div className="details-header">Median Household Income</div>
                                                <div className="details-text">{this.props.stateProfile.medianHouseholdIncome} {incomeSourceYear}</div>
                                            </div>
                                        }>
                                        <CardButton
                                            customClassName="details-button"
                                            onlyPerformAction
                                            text={<div>View awards to this state <FontAwesomeIcon icon="arrow-right" /></div>}
                                            variant="secondary"
                                            textAlignment="center"
                                            action={() => {
                                                handleGoToAdvancedSearch();
                                            }} />
                                    </CardBody>
                                </CardContainer>
                            </div>
                        </FlexGridCol>
                    </FlexGridRow>
                    <div className="state-section__viz geo">
                        <h3 className="state-overview__heading">
                            Primary Place of Performance
                        </h3>
                        <GeoVisualizationSectionContainer className="state-profile__map-toggle" />
                    </div>
                </div>
            </div>
        );
    }
}

StateOverview.propTypes = propTypes;
