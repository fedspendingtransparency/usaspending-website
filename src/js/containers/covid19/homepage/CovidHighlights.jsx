import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';
import { get } from 'lodash';

import CovidOverviewModel from 'models/v2/covid19/BaseOverview';
import { fetchCovidTotals, fetchAllCovidSpendingByCfda } from 'helpers/disasterHelper';
import { formatMoneyWithPrecision, calculateUnitForSingleValue } from 'helpers/moneyFormatter';


const TooltipContent = () => (
    <p>Yes. This is a lot of cash.</p>
);

const getTotalSpendingAbbreviated = (totalSpending) => {
    const unit = calculateUnitForSingleValue(totalSpending);
    return `${formatMoneyWithPrecision(totalSpending)} ${unit}}`;
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
    };

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
            <section className="homepage-hero covid" aria-label="Introduction">
                <div
                    id="homepage-hero__wrapper"
                    className="homepage-hero__wrapper">
                    <div className="homepage-hero__content">
                        <h1 className="homepage-hero__headline" tabIndex={-1}>
                            In 2020, the government spent <strong className="homepage-hero__headline homepage-hero__headline_weight_bold">{totalSpendingAmount}.</strong>
                            <div style={{ width: '20px' }}>
                                <TooltipWrapper icon="info" tooltipComponent={<TooltipContent />} />
                            </div>
                        </h1>
                        <hr className="homepage-hero__divider" />
                        <div className="homepage-hero__description">
                            <strong className="homepage-hero__description homepage-hero__description_weight_bold">USA Spending tracks federal spending to ensure taxpayers can see how their money is being used</strong> in communities across America. Learn more on how this money was spent with tools to help you navigate spending from top to bottom.
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default CovidHighlights;
