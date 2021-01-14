import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { connect } from 'react-redux';
import { TooltipWrapper } from 'data-transparency-ui';
import { get, uniqueId, throttle, isEqual } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// redux
import { setOverview, setDEFCodes } from 'redux/actions/covid19/covid19Actions';
import { setSubmissionPeriods } from 'redux/actions/account/accountActions';

// models
import CovidOverviewModel from 'models/v2/covid19/BaseOverview';

// helpers
import { getLatestPeriodAsMoment, fetchAllSubmissionDates } from 'helpers/accountHelper';
import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { fetchOverview, fetchDisasterSpending, fetchDEFCodes } from 'helpers/disasterHelper';
import { scrollToY } from 'helpers/scrollToHelper';

// datamapping
import { allDefCAwardTypeCodes } from 'dataMapping/covid19/covid19';

// components
import HeroButton from 'components/homepage/hero/HeroButton';
import HomePageTooltip from 'components/homepage/hero/CovidTooltip';
import TotalAmount from 'components/homepage/hero/TotalAmount';

const defaultParams = {
    pagination: {
        page: 1,
        limit: 100,
        order: "desc",
        sort: "outlay"
    },
    spending_type: "total"
};

let scrollInterval = null;

const scrollIncrement = 200;

const propTypes = {
    totalSpendingAmount: PropTypes.number,
    setCovidOverview: PropTypes.func,
    setCovidDefCodes: PropTypes.func,
    completeIncrement: PropTypes.func,
    updateSubmissionPeriods: PropTypes.func,
    submissionPeriods: PropTypes.arrayOf(PropTypes.object),
    defCodes: PropTypes.arrayOf(PropTypes.string)
};

export class CovidHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmountLoading: true,
            isDateLoading: true,
            areHighlightsLoading: true,
            highlights: [],
            isHoverActive: false,
            page: 1,
            hasNext: false,
            isIncrementComplete: false,
            imgDimensions: {
                width: 0,
                height: 0
            }
        };
        this.allSubmissionDatesRequest = null;
        this.fetchTotalsRequest = null;
        this.fetchTotalsByCfdaRequest = null;
        this.fetchDefCodesRequest = null;
        this.scrollBar = null;
        this.handleResizeWindow = throttle(this.handleResizeWindow, 10);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResizeWindow);
        this.handleResizeWindow();
        return Promise.all([this.fetchDefCodes(), this.fetchLatestSubmissionPeriod()])
            .then(() => (
                Promise.all([this.fetchHighlights(), this.fetchTotals()])
            ))
            .then(() => {
                if (!document.documentMode) {
                    scrollInterval = window.setInterval(() => {
                        const newPosition = this.scrollBar.scrollTop + scrollIncrement;
                        const maxScroll = this.scrollBar.scrollHeight - 446;
                        if (newPosition >= maxScroll && this.scrollBar.scrollHeight > 0) {
                            if (this.state.hasNext) {
                                this.fetchHighlights()
                                    .then(() => {
                                        if (!this.state.isHoverActive) {
                                            scrollToY(newPosition, 750, this.scrollBar);
                                        }
                                    });
                            }
                            else if (!this.state.isHoverActive) {
                                scrollToY(0, 750, this.scrollBar);
                            }
                        }
                        else if (!this.state.isHoverActive) {
                            scrollToY(newPosition, 750, this.scrollBar);
                        }
                    }, 3000);
                }
                else {
                    scrollInterval = window.setInterval(() => {
                        const currentPosition = this.scrollBar.scrollTop;
                        const maxScroll = this.scrollBar.scrollHeight - 446;
                        if (currentPosition >= maxScroll && this.scrollBar.scrollHeight > 0) {
                            if (this.state.hasNext) {
                                this.fetchHighlights();
                            }
                        }
                    }, 1000);
                }
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('error', e);
                    this.setState({
                        isError: true,
                        errorMessage: get(e, 'message', 'Error fetching data.')
                    });
                }
            });
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.defCodes, this.props.defCodes) && this.props.defCodes.length > 0) {
            this.fetchTotals()
                .then(() => {
                    this.fetchHighlights();
                });
        }
    }

    componentWillUnmount() {
        window.clearInterval(scrollInterval);
        window.removeEventListener('resize', this.handleResizeWindow);
        if (this.fetchTotalsRequest) {
            this.fetchTotalsRequest.cancel();
        }
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchTotalsByCfdaRequest.cancel();
        }
        if (this.allSubmissionDatesRequest) {
            this.allSubmissionDatesRequest.cancel();
        }
        if (this.fetchDefCodesRequest) {
            this.fetchDefCodesRequest.cancel();
        }
    }

    fetchLatestSubmissionPeriod = async () => {
        if (!this.props.submissionPeriods.length) {
            this.allSubmissionDatesRequest = fetchAllSubmissionDates();
            try {
                const { data: { available_periods: availablePeriods } } = await this.allSubmissionDatesRequest.promise;
                this.props.updateSubmissionPeriods(availablePeriods);
                this.allSubmissionDatesRequest = null;
                this.setState({ isDateLoading: false });
                return Promise.resolve();
            }
            catch (e) {
                if (!isCancel(e)) {
                    console.log(' Error Submission Periods : ', e.message);
                    this.allSubmissionDatesRequest = null;
                    this.setState({ isDateLoading: false });
                }
                return Promise.resolve();
            }
        }
        return Promise.resolve();
    }

    fetchTotals = () => {
        if (this.fetchTotalsRequest) {
            this.fetchTotalsRequest.cancel();
        }
        if (this.state.isIncrementComplete) {
            this.setState({ isIncrementComplete: false, isAmountLoading: true });
        }
        else {
            this.setState({ isIncrementComplete: false, isAmountLoading: true });
        }
        this.fetchTotalsRequest = fetchOverview(this.props.defCodes);
        if (this.props.totalSpendingAmount && this.props.totalSpendingAmount > 0) {
            this.setState({ isAmountLoading: false });
            return Promise.resolve();
        }
        return this.fetchTotalsRequest.promise
            .then((data) => {
                this.parseSpendingTotals(data);
                this.fetchTotalsRequest = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('error', e);
                }
            });
    }

    handleResizeWindow = () => {
        if (this.scrollBar) {
            this.setState({
                imgDimensions: {
                    width: this.scrollBar.clientWidth,
                    height: this.scrollBar.clientHeight
                }
            });
        }
    }

    fetchDefCodes = () => {
        if (this.fetchDefCodesRequest) {
            this.fetchDefCodesRequest.cancel();
        }
        this.fetchDefCodesRequest = fetchDEFCodes();
        if (this.props.defCodes.length > 0) {
            this.setState({ isAmountLoading: false });
            return Promise.resolve();
        }
        return this.fetchDefCodesRequest.promise
            .then(({ data: { codes } }) => {
                const covidDefCodes = codes
                    .filter((code) => code.disaster === 'covid_19');
                this.props.setCovidDefCodes(covidDefCodes);
            });
    }

    fetchHighlights = () => {
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchTotalsByCfdaRequest.cancel();
        }
        this.fetchTotalsByCfdaRequest = fetchDisasterSpending('cfda', {
            filter: {
                def_codes: this.props.defCodes,
                award_type_codes: allDefCAwardTypeCodes
            },
            pagination: {
                ...defaultParams.pagination,
                page: this.state.hasNext
                    ? this.state.page + 1
                    : this.state.page
            }
        });
        return this.fetchTotalsByCfdaRequest.promise
            .then((data) => {
                this.parseSpendingHighlights(data);
                this.fetchTotalsByCfdaRequest = null;
            })
            .catch((e) => {
                if (!isCancel(e)) {
                    console.log('error', e);
                    this.setState({
                        isError: true,
                        errorMessage: get(e, 'message', 'Error fetching data.')
                    });
                }
            });
    }

    parseSpendingTotals = ({ data }) => {
        const overview = Object.create(CovidOverviewModel);
        overview.populate(data);
        this.props.setCovidOverview(overview);
        this.setState({ isAmountLoading: false });
    };

    parseSpendingHighlights = ({
        data: {
            results: highlights,
            page_metadata: { page, hasNext }
        }
    }) => {
        this.setState({
            highlights: this.state.highlights.concat(highlights),
            page,
            hasNext,
            areHighlightsLoading: false
        });
    };

    handleHover = throttle(() => {
        if (!this.state.isHoverActive) {
            this.setState({ isHoverActive: true });
        }
    }, 10);

    handleBlur = throttle(() => {
        if (this.state.isHoverActive) {
            this.setState({ isHoverActive: false });
        }
    }, 250);

    completeIncrementAndTriggerScroll = () => {
        this.setState({ isIncrementComplete: true });
    }

    render() {
        const {
            isAmountLoading,
            isDateLoading,
            hasNext
        } = this.state;
        const { totalSpendingAmount, submissionPeriods } = this.props;
        const parsedDate = submissionPeriods.length
            ? getLatestPeriodAsMoment(submissionPeriods).format('MMMM DD[,] YYYY')
            : null;
        const highlights = hasNext
            ? this.state.highlights.concat([{ showLoading: true }])
            : this.state.highlights;

        return (
            <section className="covid-hero" aria-label="Introduction">
                <div id="covid-hero__wrapper" className="covid-hero__wrapper">
                    <div className="covid-hero__content">
                        <h1 className="covid-hero__headline" tabIndex={-1}>
                            <span>As of {isDateLoading ? <div className="dot-pulse" /> : `${parsedDate},`}</span>
                            <span>the Federal Government has spent </span>
                            <span>
                                {isAmountLoading && <div className="dot-pulse" />}
                                <TotalAmount
                                    completeIncrement={this.completeIncrementAndTriggerScroll}
                                    className={`covid-hero__headline--amount${isAmountLoading ? '' : ' show-amount'}`}
                                    total={totalSpendingAmount}
                                    isLoading={isAmountLoading} />
                                in response to
                            </span>
                            <span>
                                <strong>COVID-19.</strong>
                                <div style={{ width: '20px' }}>
                                    <TooltipWrapper
                                        icon="info"
                                        offsetAdjustments={{
                                            top: 0
                                        }}
                                        tooltipComponent={<HomePageTooltip />} />
                                </div>
                            </span>
                        </h1>
                        <p>
                            USAspending is the official open data source of federal spending information. We track how federal money is spent in communities across America and beyond. Learn more about government spending through interactive tools that explore elements of the federal budget, such as federal loan, grant, and contract data.
                        </p>
                    </div>
                    <div
                        className="covid-hero__content"
                        ref={(scroll) => {
                            this.scrollBar = scroll;
                        }}>
                        <ul
                            className="covid-highlights"
                            onFocus={this.handleHover}
                            onMouseLeave={this.handleBlur}
                            onMouseEnter={this.handleHover}
                            onBlur={this.handleBlur}>
                            {highlights
                                .filter((highlight) => highlight.outlay > 0 || highlight.showLoading)
                                .map((highlight) => {
                                    if (highlight.showLoading) {
                                        return (
                                            <li key={uniqueId('loading')}className="covid-highlights__highlight loading">
                                                <FontAwesomeIcon icon="spinner" spin color="white" />
                                            </li>
                                        );
                                    }
                                    return (
                                        <li
                                            key={uniqueId(highlight.description)}
                                            className="covid-highlights__highlight">
                                            <span className="covid-highlight__description">{highlight.description}</span>
                                            <span className="covid-highlight__amount">{formatMoneyWithPrecision(highlight.outlay, 0)}</span>
                                            <span>OUTLAYED AMOUNT</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div
                        className="covid-background"
                        style={{
                            width: `${this.state.imgDimensions.width}px`,
                            height: `${this.state.imgDimensions.height}px`,
                            zIndex: 9
                        }} />
                    <HeroButton />
                </div>
            </section>
        );
    }
}

CovidHighlights.propTypes = propTypes;

const mapStateToProps = (state) => ({
    totalSpendingAmount: state.covid19.overview._totalOutlays,
    defCodes: state.covid19.defCodes.map((code) => code.code),
    submissionPeriods: state.account.submissionPeriods.toJS()
});

const mapDispatchToProps = (dispatch) => ({
    setCovidOverview: (overview) => dispatch(setOverview(overview)),
    setCovidDefCodes: (codes) => dispatch(setDEFCodes(codes)),
    updateSubmissionPeriods: (periods) => dispatch(setSubmissionPeriods(periods))
});

export default connect(mapStateToProps, mapDispatchToProps)(CovidHighlights);
