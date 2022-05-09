/**
 * AgencyLandingTable.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import HeaderRow from './HeaderRow';
import TableRow from './TableRow';

const propTypes = {
    results: PropTypes.array,
    columns: PropTypes.array,
    agencySearchString: PropTypes.string
};

export default class AgencyLandingTable extends React.PureComponent {
    render() {
        let noResultsClass = '';
        if (this.props.results.length === 0) {
            // remove duplicated bottom border
            noResultsClass = ' no-results';
        }


        const rows = this.props.results.map((agency, index) => (
            <TableRow
                agency={agency}
                key={agency.agency_id}
                rowIndex={index}
                columns={this.props.columns}
                agencySearchString={this.props.agencySearchString} />
        ));

        return (
            <div className={`agency-landing-results-table${noResultsClass}`}>
                <table>
                    <thead>
                        <HeaderRow
                            columns={this.props.columns} />
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

AgencyLandingTable.propTypes = propTypes;
