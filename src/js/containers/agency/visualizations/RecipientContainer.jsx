/**
 * RecipientContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isCancel } from 'axios';
import { slice } from 'lodash';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import RecipientVisualization from
    'components/agency/visualizations/recipient/RecipientVisualization';

const propTypes = {
    id: PropTypes.string,
    activeFY: PropTypes.string,
    lastUpdate: PropTypes.string
};

export default class RecipientContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            isInitialLoad: true,
            error: false,
            scope: 'all',
            page: 1,
            isLastPage: true,
            labelSeries: [],
            dataSeries: [],
            descriptions: []
        };

        this.request = null;

        this.changeScope = this.changeScope.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.loadData(this.props.id, this.props.activeFY, 1);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.activeFY !== prevProps.activeFY) {
            this.setUpdateState(this.props);
        }
    }

    setUpdateState(props) {
        this.setState({
            isInitialLoad: true
        }, () => {
            this.loadData(props.id, props.activeFY, 1);
        });
    }

    loadData(id, fy, pageNumber = 1) {
        if (!id || id === '' || !fy || fy === '') {
            // invalid ID or fiscal year
            return;
        }

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        const params = {
            fiscal_year: fy,
            awarding_agency_id: id,
            limit: 10,
            page: pageNumber
        };

        if (this.state.scope !== 'all') {
            params.award_category = this.state.scope;
        }

        this.request = AgencyHelper.fetchAwardRecipients(params);

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false,
                    isInitialLoad: false,
                    page: pageNumber,
                    isLastPage: !res.data.page_metadata.has_next_page
                });

                this.parseData(res.data.results);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.setState({
                        loading: false,
                        error: true
                    });

                    console.log(err);
                }

                this.request = null;
            });
    }

    changePage(pageNumber) {
        if (pageNumber < 1 || (this.state.isLastPage && pageNumber > this.state.page)) {
            // Requested page number is out of range; don't do anything
            return;
        }

        this.setState({
            page: pageNumber
        }, () => {
            this.loadData(this.props.id, this.props.activeFY, pageNumber);
        });
    }

    parseData(data) {
    // keep only the top 10 in descending order
        const results = slice(data, 0, 10);
        const dataSeries = [];
        const labelSeries = [];
        const descriptions = [];

        results.forEach((result) => {
            let parsedValue = parseFloat(result.obligated_amount);
            if (isNaN(parsedValue)) {
                // the aggregate value is invalid (most likely null)
                parsedValue = 0;
            }

            const recipient = result.recipient.recipient_name;

            labelSeries.push(recipient);
            dataSeries.push(parsedValue);
            const description = `${MoneyFormatter.formatMoney(parsedValue)} awarded to \
${recipient}`;
            descriptions.push(description);
        });


        this.setState({
            dataSeries,
            labelSeries,
            descriptions
        });
    }

    changeScope(scope) {
        this.setState({
            scope
        }, () => {
            this.loadData(this.props.id, this.props.activeFY, 1);
        });
    }

    render() {
        return (
            <RecipientVisualization
                activeFY={this.props.activeFY}
                page={this.state.page}
                isLastPage={this.state.isLastPage}
                dataSeries={this.state.dataSeries}
                labelSeries={this.state.labelSeries}
                descriptions={this.state.descriptions}
                loading={this.state.loading}
                isInitialLoad={this.state.isInitialLoad}
                error={this.state.error}
                scope={this.state.scope}
                changeScope={this.changeScope}
                changePage={this.changePage}
                lastUpdate={this.props.lastUpdate} />
        );
    }
}

RecipientContainer.propTypes = propTypes;
