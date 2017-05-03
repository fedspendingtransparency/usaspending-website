/**
 * ContractAdditionalDetails
 * Created by Kevin Li 3/2/17
 */

import React from 'react';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as DataFields from 'dataMapping/financialAssistance/additionalDetails';
import FinancialSystemItem from 'models/results/other/FinancialSystemItem';

import AdditionalGroup from './AdditionalGroup';

const propTypes = {
    award: React.PropTypes.object
};

export default class AssistanceAdditionalDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasLoaded: false,
            inFlight: false,
            items: {}
        };
    }
    componentDidMount() {
        this.loadAdditionalInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.award.selectedAward.id !== prevProps.award.selectedAward.id) {
            this.loadAdditionalInfo();
        }
    }

    componentWillUnmount() {
        if (this.financialRequest) {
            this.financialRequest.cancel();
        }
    }


    loadAdditionalInfo() {
        const awardId = this.props.award.selectedAward.id;
        const assistanceFields = [
            'treasury_account',
            'object_class',
            'program_activity'
        ];
        if (!awardId) {
            return;
        }

        this.setState({
            inFlight: true
        });

        if (this.financialRequest) {
            this.financialRequest.cancel();
        }

        this.financialRequest = SearchHelper.performFinancialSystemLookup({
            verbose: true,
            filters: [
                {
                    field: 'award',
                    operation: 'equals',
                    value: awardId
                }
            ],
            order_by: 'reporting_period_start',
            limit: 1,
            fields: assistanceFields
        });

        this.financialRequest.promise
            .then((res) => {
                let finItem = {};

                res.data.results.forEach((item) => {
                    finItem = new FinancialSystemItem(item);
                });


                this.setState({
                    hasLoaded: true,
                    inFlight: false,
                    items: finItem
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.financialRequest = null;
                    this.setState({
                        inFlight: false
                    });
                }
            });
    }

    render() {
        return (
            <div className="additional-details-wrapper">
                <AdditionalGroup
                    data={this.state.items}
                    fields={DataFields.budgetFields}
                    title={"Budget Information"}
                    inFlight={this.state.inFlight} />
            </div>
        );
    }
}

AssistanceAdditionalDetails.propTypes = propTypes;
