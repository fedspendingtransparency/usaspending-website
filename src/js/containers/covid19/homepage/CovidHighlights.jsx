import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TooltipWrapper } from 'data-transparency-ui';
import { get, uniqueId, delay } from 'lodash';

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

const TotalAmount = ({
    total,
    isLoading,
    className,
    completeIncrement
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const updateAmount = (amount) => new Promise((resolve) => {
            amountUpdate = delay(() => {
                ref.current.innerHTML = getTotalSpendingAbbreviated(amount);
                resolve();
            }, 5);
        });
        if (!isLoading) {
            new Array(1000)
                .fill(0)
                .reduce((prevPromise, currentValue, currentIndex) => prevPromise
                    .then(() => {
                        const divisor = (currentIndex + 1) * 0.001;
                        return updateAmount(divisor * total);
                    }), Promise.resolve())
                .then(() => {
                    console.log('done');
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
    isLoading: PropTypes.boolean,
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
        return this.fetchTotalsRequest.promise
            .then((data) => {
                this.parseSpendingTotals(data);
                this.fetchTotalsRequest = null;
            })
            .catch((e) => {
                this.setState({
                    isError: true,
                    errorMessage: get(e, 'message', 'Error fetching data.')
                });
            });
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

    handleHover = () => {
        console.log('hover');
        if (!this.state.isHoverActive) {
            this.setState({ isHoverActive: true });
        }
    };

    handleBlur = () => {
        console.log('blur');
        this.setState({ isHoverActive: false });
    };

    completeIncrementAndFetchHighlights = () => {
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchHighlights.cancel();
        }
        this.fetchTotalsByCfdaRequest = fetchDisasterSpending('cfda', defaultParams);
        return this.fetchTotalsByCfdaRequest.promise
            .then(() => {
                if (!document.documentMode) {
                    scrollInterval = window.setInterval(() => {
                        const newPosition = this.scrollBar.scrollTop + 72;
                        const maxScroll = this.scrollBar.scrollHeight - 446;
                        if (newPosition >= maxScroll) {
                            this.fetchHighlights()
                                .then(() => {
                                    if (!this.state.isHoverActive) {
                                        scrollToY(newPosition, 2000, this.scrollBar);
                                    }
                                });
                        }
                        else if (!this.state.isHoverActive && !this.fetchTotalsByCfdaRequest) {
                            scrollToY(newPosition, 2000, this.scrollBar);
                        }
                    }, 3000);
                }
            })
            .then(() => {
                this.setState({ isIncrementComplete: true });
            });
    }

    render() {
        const {
            highlights,
            isAmountLoading
        } = this.state;
        const { totalSpendingAmount } = this.props;
        return (
            <section className="covid-hero" aria-label="Introduction">
                <div id="covid-hero__wrapper" className="covid-hero__wrapper">
                    <div className="covid-hero__content">
                        <h1 className="covid-hero__headline" tabIndex={-1}>
                            As of June 2020,
                            <span>The Federal Government has spent </span>
                            <span>
                                {isAmountLoading && <div className="dot-pulse" />}
                                <TotalAmount
                                    completeIncrement={this.completeIncrementAndFetchHighlights}
                                    className={`covid-hero__headline--amount${isAmountLoading ? '' : ' show-amount'}`}
                                    total={totalSpendingAmount}
                                    isLoading={isAmountLoading} />
                                in response to
                            </span>
                            <span className="covid-hero__headline">
                                {` COVID-19.`}
                                <div style={{ width: '20px' }}>
                                    <TooltipWrapper icon="info" tooltipComponent={<TooltipContent />} />
                                </div>
                            </span>
                        </h1>
                        <p>
                            USAspending is the official source of federal spending data - including spending in response to COVID-19. The tools and features on the site allow taxpayers to see how their money is spent communities across the country.
                        </p>
                    </div>
                    <div
                        className="covid-hero__content"
                        ref={(scroll) => {
                            this.scrollBar = scroll;
                        }}>
                        <ul className="covid-highlights">
                            {highlights.map((highlight) => {
                                const dollarAmount = formatMoneyWithPrecision(highlight.outlay, 0);
                                return (
                                    <li
                                        key={uniqueId(highlight.description)}
                                        className="covid-highlights__highlight"
                                        onFocus={this.handleHover}
                                        onMouseOver={this.handleHover}
                                        onMouseLeave={this.handleHover}
                                        onMouseOut={this.handleBlur}
                                        onBlur={this.handleBlur}>
                                        <span className="covid-highlight__description">{highlight.description}</span>
                                        <span className="covid-highlight__amount">{dollarAmount}</span>
                                        <span>OUTLAYED AMOUT</span>
                                    </li>
                                );
                            })}
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
