/**
 * AwardDataArchiveForm.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ArchiveAgencyFilter from './filters/AgencyFilter';
import ArchiveTypeFilter from './filters/TypeFilter';
import ArchiveFiscalYearFilter from './filters/FiscalYearFilter';

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    requestResults: PropTypes.func
};

export default class AwardDataArchiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.requestResults();
    }

    render() {
        return (
            <div className="award-data-archive-form">
                <div className="form-title">
                    Filter by
                </div>
                <form
                    className="archive-form"
                    onSubmit={this.handleSubmit}>
                    <ArchiveAgencyFilter
                        agency={this.props.filters.agency}
                        updateFilter={this.props.updateFilter}
                        agencies={this.props.agencies} />
                    <ArchiveTypeFilter
                        currentType={this.props.filters.type.display}
                        updateFilter={this.props.updateFilter} />
                    <ArchiveFiscalYearFilter
                        currentFY={this.props.filters.fy}
                        updateFilter={this.props.updateFilter} />
                    <div className="submit-button">
                        <input type="submit" value="Apply" />
                    </div>
                </form>
            </div>
        );
    }
}

AwardDataArchiveForm.propTypes = propTypes;
