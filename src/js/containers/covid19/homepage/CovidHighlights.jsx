import React from 'react';
// import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { get } from 'lodash';

// import CovidOverviewModel from 'models/v2/covid19/BaseOverview';
import { fetchCovidTotals, fetchAllCovidSpendingByCfda } from 'helpers/disasterHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';
import HeroButton from 'components/homepage/hero/HeroButton';

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

export class CovidHighlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSpendingAmount: 0,
            isLoading: false,
            highlights: []
        };
        this.fetchTotalsRequest = null;
        this.fetchTotalsByCfdaRequest = null;
    }

    componentDidMount() {
        if (this.fetchTotalsRequest) {
            this.fetchTotalsRequest.cancel();
        }
        if (this.fetchTotalsByCfdaRequest) {
            this.fetchTotalsByCfdaRequest.cancel();
        }
        this.fetchTotalsRequest = fetchCovidTotals();
        this.fetchTotalsByCfdaRequest = fetchAllCovidSpendingByCfda(defaultParams)
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
                this.setState({ isLoading: false });
            })
            .catch((e) => {
                this.setState({
                    isError: true,
                    errorMessage: get(e, 'message', 'Error fetching data.')
                });
            });
    }

    parseSpendingTotals = ({
        data: { spending: { total_obligations: totalSpendingAmount } }
    }) => {
        this.setState({
            totalSpendingAmount: getTotalSpendingAbbreviated(totalSpendingAmount)
        });
    };

    parseSpendingHighlights = ({ data: { results: highlights }}) => {
        this.setState({ highlights });
    };

    render() {
        const {
            totalSpendingAmount
        } = this.state;
        return (
            <section className="covid-hero" aria-label="Introduction">
                <div id="covid-hero__wrapper" className="covid-hero__wrapper">
                    <div className="covid-hero__content">
                        <h1 className="covid-hero__headline" tabIndex={-1}>
                            As of June 2020,
                            <span>The Federal Government has spent</span>
                            <span>
                                <strong className="covid-hero__headline--amount">{
                                    ` ${totalSpendingAmount} `}
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
                    <div className="covid-hero__content">
                        Rolling data.
                    </div>
                    <HeroButton />
                </div>
            </section>
        );
    }
}

export default CovidHighlights;
