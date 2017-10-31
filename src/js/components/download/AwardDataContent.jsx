/**
 * AwardDataContent.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DownloadCheckbox from './DownloadCheckbox';

const propTypes = {
    awardLevels: PropTypes.array,
    awardTypes: PropTypes.array
};

export default class AwardDataContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prime_awards: false,
            sub_awards: false,
            contracts: false,
            grants: false,
            direct_payments: false,
            loans: false,
            other_financial_assistance: false,
            agency: '',
            subAgency: '',
            dateType: '',
            dateRange: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // TODO: Lizzie - use container function from props
        console.log(`Submitted ${JSON.stringify(this.state)}`);
        event.preventDefault();
    }

    render() {
        const awardLevels = this.props.awardLevels.map((level) => (
            <DownloadCheckbox
                key={level.name}
                name={level.name}
                label={level.label}
                checked={this.state[level.name]}
                onChange={this.handleInputChange} />
        ));

        const awardTypes = this.props.awardTypes.map((type) => (
            <DownloadCheckbox
                key={type.name}
                name={type.name}
                label={type.label}
                checked={this.state[type.name]}
                onChange={this.handleInputChange} />
        ));

        return (
            <div className="download-data-content">
                <div className="download-filters">
                    <h2><span>Award Data</span> Download</h2>
                    <form
                        className="download-form"
                        onSubmit={this.handleSubmit}>
                        <div className="filter-section">
                            <h5 className="filter-section-title">
                                Select the <span>award level</span> to include.
                            </h5>
                            {awardLevels}
                        </div>
                        <div className="filter-section">
                            <h5 className="filter-section-title">
                                Select the <span>award types</span> to include.
                            </h5>
                            {awardTypes}
                        </div>
                        <input type="submit" value="Download" />
                    </form>
                </div>
                <div className="download-info">
                    <h6>About Award Data</h6>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo,
                        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper
                        nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum
                        at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.
                    </p>
                </div>
            </div>
        );
    }
}

AwardDataContent.propTypes = propTypes;
