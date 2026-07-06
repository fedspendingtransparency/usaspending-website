/**
 * AwardDataArchiveContent.jsx
 * Created by Lizzie Salita 12/12/17
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import isMobileContext from "context/IsMobileContext";
import AwardDataArchiveForm from './AwardDataArchiveForm';
import AwardDataArchiveTable from './table/AwardDataArchiveTable';
import AwardDataArchiveUserSelections from "./AwardDataArchiveUserSelections";

const propTypes = {
    filters: PropTypes.object,
    updateFilter: PropTypes.func,
    agencies: PropTypes.object,
    results: PropTypes.array,
    columns: PropTypes.array,
    requestResults: PropTypes.func
};

/* eslint-disable max-len */
const AwardDataArchiveContent = ({
    filters,
    updateFilter,
    agencies,
    results,
    columns,
    requestResults
}) => {
    const { isTablet } = useContext(isMobileContext);

    return (
        <div className="award-data-archive-content">
            <h2>Award Data Archive</h2>
            <p>
                A great way to get a view into broad spending trends and, best of all,
                the files are already prepaid — you can access them instantaneously.
            </p>
            <p>
                New files are uploaded by the 15th of each month.
                Check the &#39;Data As Of&#39; column to see the last time files were generated.
                There are two downloadable archive file types:
                <ul>
                    <li>
                        <b> Full files</b> - data for the fiscal year up until the date the file was prepared
                    </li>
                    <li>
                        <b>Delta files</b> - only new, modified, and deleted data since the date the last month&#39;s files were generated.
                        The `correction_delete_ind` column in the delta files indicates whether a record has been modified (C), deleted (D), or added (blank).
                    </li>
                </ul>
            </p>
            <AwardDataArchiveForm
                filters={filters}
                updateFilter={updateFilter}
                agencies={agencies}
                requestResults={requestResults}/>
            <AwardDataArchiveTable
                columns={columns}
                results={results}/>
            {isTablet && <AwardDataArchiveUserSelections filters={filters} results={results}/>}
        </div>
    );
}

AwardDataArchiveContent.propTypes = propTypes;
export default AwardDataArchiveContent;
