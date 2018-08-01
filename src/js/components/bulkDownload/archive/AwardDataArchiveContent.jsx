/**
 * AwardDataArchiveContent.jsx
 * Created by Lizzie Salita 12/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import AwardDataArchiveForm from './AwardDataArchiveForm';
import AwardDataArchiveTable from './table/AwardDataArchiveTable';

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    results: PropTypes.array,
    columns: PropTypes.array,
    requestResults: PropTypes.func
};

export default class AwardDataArchiveContent extends React.Component {
    render() {
        return (
            <div className="award-data-archive-content">
                <h2>Award Data Archive</h2>
                <p>
                    Welcome to the <b>Award Data Archive</b>, which features major agencies&rsquo; award transaction data for full
                    fiscal years. They&rsquo;re a great way to get a view into broad spending trends and, best of all, the files
                    are already prepared &mdash; you can access them instantaneously.
                </p>
                <p>
                    New files are uploaded by the 15th of each month. Check the Data As Of column to see the last time files were generated. <b>Full files</b> feature data for the fiscal year up until the date the file was prepared, and <b>delta files</b> feature only new, modified, and deleted data since the date the last month&apos;s files were generated. The `correction_delete_ind` column in the delta files indicates whether a record has been modified (C), deleted (D), or added (blank).
                    To download data prior to FY 2008, visit our <a href="#/download_center/custom_award_data">Custom Award Data</a> page.
                </p>
                <p>
                    Ready to grab your data? Complete the form below.
                </p>
                <AwardDataArchiveForm
                    filters={this.props.filters}
                    updateFilter={this.props.updateFilter}
                    agencies={this.props.agencies}
                    requestResults={this.props.requestResults} />
                <AwardDataArchiveTable
                    columns={this.props.columns}
                    results={this.props.results} />
            </div>
        );
    }
}

AwardDataArchiveContent.propTypes = propTypes;
