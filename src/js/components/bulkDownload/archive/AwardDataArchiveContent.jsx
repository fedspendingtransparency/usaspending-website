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
                    New files are uploaded on the 15th of each month; if an agency&apos;s data hasn&apos;t changed since the previous month, no new file will be added. <b>Full files</b> feature aggregate data (data for the fiscal year up until the date listed), and <b>delta files</b> (coming soon) feature only new and modified data.
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
