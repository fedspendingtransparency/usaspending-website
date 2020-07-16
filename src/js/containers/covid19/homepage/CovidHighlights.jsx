import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TooltipWrapper } from 'data-transparency-ui';
import { get, uniqueId, delay, throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { setOverview } from 'redux/actions/covid19/covid19Actions';
import CovidOverviewModel from 'models/v2/covid19/BaseOverview';
import { fetchCovidTotals, fetchDisasterSpending } from 'helpers/disasterHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';
import { scrollToY } from 'helpers/scrollToHelper';
import HeroButton from 'components/homepage/hero/HeroButton';

const TooltipContent = () => (
    <p>Yes. This is a lot of cash.</p>
);

const getTotalSpendingAbbreviated = (totalSpending) => {
    const unit = calculateUnitForSingleValue(totalSpending);
    const abbreviatedValue = formatMoneyWithPrecision(totalSpending / unit.unit, 2);
    return `${abbreviatedValue} ${unit.longLabel}`;
};

const allDefCAwardTypeCodes = [
    'IDV_A',
    'IDV_B',
    'IDV_B_A',
    'IDV_B_B',
    'IDV_B_C',
    'IDV_C',
    'IDV_D',
    'IDV_E',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    'A',
    'B',
    'C',
    'D'
];

const defaultParams = {
    filter: {
        def_codes: ["L", "M", "N", "O", "P"],
        award_type_codes: allDefCAwardTypeCodes
    },
    pagination: {
        page: 1,
        limit: 100,
        order: "desc",
        sort: "outlay"
    },
    spending_type: "total"
};

let scrollInterval = null;
let amountUpdate = null;

const updateSpeedByIndexRange = (index) => {
    const indexAsInt = index + 1;
    if (indexAsInt <= 100) return 1;
    if (indexAsInt <= 200) return 2;
    if (indexAsInt <= 300) return 4;
    if (indexAsInt <= 400) return 8;
    if (indexAsInt <= 425) return 16;
    if (indexAsInt <= 490) return 32;
    return 64;
};

const TotalAmount = ({
    total,
    isLoading,
    className,
    completeIncrement
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const now = moment();
        const updateAmount = (amount, speedOfUpdate) => new Promise((resolve) => {
            amountUpdate = delay(() => {
                ref.current.innerHTML = getTotalSpendingAbbreviated(amount);
                if (amount === total) {
                    console.log('RESULT: ', moment.duration(moment().diff(now)).as('seconds'));
                }
                resolve();
            }, speedOfUpdate);
        });
        if (!isLoading) {
            new Array(500)
                .fill(0)
                .reduce((prevPromise, currentValue, currentIndex) => prevPromise
                    .then(() => {
                        const divisor = (currentIndex + 1) * 0.002;
                        return updateAmount(divisor * total, updateSpeedByIndexRange(currentIndex));
                    }), Promise.resolve())
                .then(() => {
                    completeIncrement();
                });
        }
    }, [isLoading, total, completeIncrement]);

    useEffect(() => (
        () => {
            if (amountUpdate) {
                window.clearTimeout(amountUpdate);
            }
        }
    ));

    return (
        <strong className={className} ref={ref}>$0.00</strong>
    );
};

TotalAmount.propTypes = {
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    className: PropTypes.string,
    completeIncrement: PropTypes.func
};

const propTypes = {
    totalSpendingAmount: PropTypes.number,
    setCovidOverview: PropTypes.func,
    completeIncrement: PropTypes.func
};

export class CovidHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAmountLoading: true,
            areHighlightsLoading: true,
            // AKA CFDA accounts or w/e
            highlights: [],
            isHoverActive: false,
            page: 1,
            hasNext: false,
            isIncrementComplete: false
        };
        this.fetchTotalsRequest = null;
        this.fetchTotalsByCfdaRequest = null;
        this.scrollBar = null;
    }

    componentDidMount() {
        if (this.fetchTotalsRequest) {
            this.fetchTotalsRequest.cancel();
        }
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchTotalsByCfdaRequest.cancel();
        }
        this.fetchTotalsRequest = fetchCovidTotals();

        return this.fetchHighlights()
            .then(() => {
                if (!document.documentMode) {
                    scrollInterval = window.setInterval(() => {
                        const newPosition = this.scrollBar.scrollTop + 72;
                        const maxScroll = this.scrollBar.scrollHeight - 446;
                        if (newPosition >= maxScroll && this.scrollBar.scrollHeight > 0) {
                            this.fetchHighlights()
                                .then(() => {
                                    if (!this.state.isHoverActive) {
                                        scrollToY(newPosition, 750, this.scrollBar);
                                    }
                                });
                        }
                        else if (!this.state.isHoverActive) {
                            scrollToY(newPosition, 750, this.scrollBar);
                        }
                    }, 3000);
                }
            })
            .then(() => {
                this.fetchTotalsRequest.promise
                    .then((data) => {
                        this.parseSpendingTotals(data);
                        this.fetchTotalsRequest = null;
                    });
            })
            .catch((e) => {
                this.setState({
                    isError: true,
                    errorMessage: get(e, 'message', 'Error fetching data.')
                });
            });
    }

    shouldComponentUpdate(prevProps, nextState) {
        const hoverStateChanged = (nextState.isHoverActive !== this.state.isHoverActive);
        if (!this.state.isIncrementComplete && hoverStateChanged) {
            // if we re-render in this case the increment of the total amount will stop and we will display an inaccurate total number.
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        window.clearInterval(scrollInterval);
        window.clearInterval(amountUpdate);
    }

    fetchHighlights = () => {
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchTotalsByCfdaRequest.cancel();
        }
        this.fetchTotalsByCfdaRequest = fetchDisasterSpending('cfda', {
            ...defaultParams,
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
                this.setState({
                    isError: true,
                    errorMessage: get(e, 'message', 'Error fetching data.')
                });
            });
    }

    parseSpendingTotals = ({ data }) => {
        this.setState({ isAmountLoading: false });
        const overview = Object.create(CovidOverviewModel);
        overview.populate(data);
        this.props.setCovidOverview(overview);
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
            hasNext
        } = this.state;
        const { totalSpendingAmount } = this.props;
        const highlights = hasNext
            ? this.state.highlights.concat([{ showLoading: true }])
            : this.state.highlights;
        return (
            <section className="covid-hero" aria-label="Introduction">
                <div id="covid-hero__wrapper" className="covid-hero__wrapper">
                    <div className="covid-hero__content">
                        <h1 className="covid-hero__headline" tabIndex={-1}>
                            <span>As of June 2020,</span>
                            <span>the Federal Government has spent </span>
                            <span>
                                {isAmountLoading && <div className="dot-pulse" />}
                                <TotalAmount
                                    completeIncrement={this.completeIncrementAndTriggerScroll}
                                    className={`covid-hero__headline--amount${isAmountLoading ? '' : ' show-amount'}`}
                                    total={totalSpendingAmount}
                                    isLoading={isAmountLoading} />
                                in response to
                                <span>
                                    <strong>{` COVID-19.`}</strong>
                                    <div style={{ width: '20px' }}>
                                        <TooltipWrapper icon="info" tooltipComponent={<TooltipContent />} />
                                    </div>
                                </span>
                            </span>
                        </h1>
                        <p>
                            <strong>USAspending is the official source of federal spending data - including spending in response to COVID-19.</strong> We track how federal money is spent in communities across America and beyond. Learn more about government spending through interactive tools that explore elements of the federal budget, such as federal loan, grant, and contract data.
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
                                .map((highlight) => {
                                    if (highlight.showLoading) {
                                        return (
                                            <li key={uniqueId('loading')}className="covid-highlights__highlight">
                                                <FontAwesomeIcon icon="spinner" spin color="white" />
                                            </li>
                                        );
                                    }
                                    const dollarAmount = formatMoneyWithPrecision(highlight.outlay, 0);
                                    return (
                                        <li
                                            key={uniqueId(highlight.description)}
                                            className="covid-highlights__highlight">
                                            <span className="covid-highlight__description">{highlight.description}</span>
                                            <span className="covid-highlight__amount">{dollarAmount}</span>
                                            <span>OUTLAYED AMOUT</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <HeroButton />
                </div>
            </section>
        );
    }
}

CovidHighlights.propTypes = propTypes;

const mapStateToProps = (state) => ({
    totalSpendingAmount: state.covid19.overview._totalObligations
});

const mapDispatchToProps = (dispatch) => ({
    setCovidOverview: (overview) => dispatch(setOverview(overview))
});

export default connect(mapStateToProps, mapDispatchToProps)(CovidHighlights);
