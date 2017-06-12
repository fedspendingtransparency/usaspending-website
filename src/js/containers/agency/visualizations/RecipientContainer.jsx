/**
 * RecipientContainer.jsx
 * Created by Kevin Li 6/8/17
 */

import React from 'react';
import { isCancel } from 'axios';
import { orderBy, slice } from 'lodash';

import * as AgencyHelper from 'helpers/agencyHelper';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import RecipientVisualization from
    'components/agency/visualizations/recipient/RecipientVisualization';

const propTypes = {
    id: React.PropTypes.string,
    activeFY: React.PropTypes.string
};

export default class RecipientContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            scope: 'all',
            labelSeries: [],
            dataSeries: [],
            descriptions: []
        };

        this.request = null;

        this.changeScope = this.changeScope.bind(this);
    }

    componentWillMount() {
        this.loadData(this.props.id, this.props.activeFY);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id || this.props.activeFY !== nextProps.activeFY) {
            this.loadData(nextProps.id, nextProps.activeFY);
        }
    }

    loadData(id, fy) {
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

        this.request = AgencyHelper.fetchAwardRecipients({
            fiscal_year: fy,
            awarding_agency_id: id
        });

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false
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
            this.loadData(this.props.id, this.props.activeFY);
        });
    }

    render() {
        return (
            <RecipientVisualization
                dataSeries={this.state.dataSeries}
                labelSeries={this.state.labelSeries}
                descriptions={this.state.descriptions}
                loading={this.state.loading}
                error={this.state.error}
                scope={this.state.scope}
                changeScope={this.changeScope} />
        );
    }
}

RecipientContainer.propTypes = propTypes;
