/**
 * AwardDataArchiveTable.jsx
 * Created by Lizzie Salita 12/13/17
 */

import React from 'react';

export default class AwardDataArchiveTable extends React.Component {
    render() {
        return (
            <table className="award-data-archive-table">
                <thead>
                    <tr>
                        <th>Agency</th>
                        <th>Award Type</th>
                        <th>Fiscal Year</th>
                        <th>Date As Of</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>DEPT OF ENERGY (DOE)</td>
                        <td>filename.csv.zip</td>
                        <td>FY 2017</td>
                        <td>11/15/17</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
