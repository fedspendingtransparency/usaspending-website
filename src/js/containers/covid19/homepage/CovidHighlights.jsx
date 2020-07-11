import React from 'react';
// import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { get, uniqueId, delay } from 'lodash';

// import CovidOverviewModel from 'models/v2/covid19/BaseOverview';
import { fetchCovidTotals, fetchAllCovidSpendingByCfda } from 'helpers/disasterHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';
import HeroButton from 'components/homepage/hero/HeroButton';
import { scrollToY } from '../../../helpers/scrollToHelper';

const TooltipContent = () => (
    <p>Yes. This is a lot of cash.</p>
);

const getTotalSpendingAbbreviated = (totalSpending) => {
    const unit = calculateUnitForSingleValue(totalSpending);
    const abbreviatedValue = formatMoneyWithPrecision(totalSpending / unit.unit, 2);
    return `${abbreviatedValue} ${unit.longLabel}`;
};

const defaultParams = {
    filter: {
        def_codes: ["L", "M", "N", "O", "P"],
        award_type_codes: ["total"]
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
let artificialDelay = null;

export class CovidHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSpendingAmount: getTotalSpendingAbbreviated(0),
            isAmountLoading: true,
            areHighlightsLoading: true,
            // AKA CFDA accounts or w/e
            highlights: [],
            isHoverActive: false
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
        this.fetchTotalsByCfdaRequest = fetchAllCovidSpendingByCfda(defaultParams);
        return Promise.all([
            this.fetchTotalsRequest.promise
                .then((data) => {
                    this.parseSpendingTotals(data);
                    this.fetchTotalsRequest = null;
                }),
            this.fetchTotalsByCfdaRequest.promise
                .then((data) => {
                    this.parseSpendingHighlights(data);
                    this.fetchTotalsByCfdaRequest = null;
                })
        ])
            .then(() => {
                scrollInterval = window.setInterval(() => {
                    const newPosition = this.scrollBar.scrollTop + 72;
                    const maxScroll = this.scrollBar.scrollHeight - 446;
                    if (newPosition >= maxScroll && !this.state.isHoverActive) {
                        scrollToY(0, 2000, this.scrollBar);
                    }
                    else if (!this.state.isHoverActive) {
                        scrollToY(newPosition, 2000, this.scrollBar);
                    }
                }, 3000);
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
        window.clearInterval(artificialDelay);
    }

    updateTotalSpending = (newAmount) => {
        this.setState({
            totalSpendingAmount: getTotalSpendingAbbreviated(newAmount)
        });
    }

    parseSpendingTotals = ({
        data: { spending: { total_obligations: totalSpendingAmount } }
    }) => {
        // this is really fun and all but doesnt work in IE :(
        artificialDelay = delay(() => {
            this.setState({ isAmountLoading: false }, () => {
                new Array(1000)
                    .fill(0)
                    .forEach((num, index) => {
                        const divisor = (index + 1) * 0.001;
                        amountUpdate = delay(() => this.updateTotalSpending(divisor * totalSpendingAmount), 1750);
                    });
            });
        }, 3000);
    };

    parseSpendingHighlights = ({ data: { results: highlights }}) => {
        this.setState({ highlights, areHighlightsLoading: false });
    };

    handleHover = () => {
        this.setState({ isHoverActive: true });
    };

    handleBlur = () => {
        this.setState({ isHoverActive: false });
    };

    render() {
        const {
            totalSpendingAmount,
            highlights,
            isAmountLoading
        } = this.state;
        return (
            <section className="covid-hero" aria-label="Introduction">
                <div id="covid-hero__wrapper" className="covid-hero__wrapper">
                    <div className="covid-hero__content">
                        <h1 className="covid-hero__headline" tabIndex={-1}>
                            As of June 2020,
                            <span>The Federal Government has spent </span>
                            <span>
                                {isAmountLoading && <div className="dot-pulse" />}
                                <strong className={`covid-hero__headline--amount${isAmountLoading ? '' : ' show-amount'}`}>
                                    {totalSpendingAmount}
                                </strong>
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

export default CovidHighlights;
