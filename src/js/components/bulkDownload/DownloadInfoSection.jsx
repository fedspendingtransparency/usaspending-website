/**
 * DownloadInfoSection.jsx
 * Created by JD House 8/4/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Note, { dodNote } from 'components/sharedComponents/Note';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import kGlobalConstants from 'GlobalConstants';



const propTypes = {
    dataType: PropTypes.string
};

const DownloadInfoSection = ({
    dataType
}) => {
    
    if (dataType === "accounts") {
        return (
            <>
                <h3 className="download-info__title">About Account Data</h3>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">What is account data?</h4>
                    <p>
                        Account data covers all spending data, including non-award spending.
                    </p>
                    <p>
                        The data is available on two different levels, <strong>federal account</strong>&nbsp;
                        <Link to="/download_center/custom_account_data?glossary=federal-account"><Glossary /></Link>
                        and <strong>treasury account</strong>&nbsp;
                        <Link to="/download_center/custom_account_data?glossary=treasury-account-symbol-tas"><Glossary /></Link>
                        . Federal account data is essentially a &ldquo;roll-up&rdquo; of multiple treasury account data.
                    </p>
                    <p>
                        The files available are categorized by type, according to the scope of spending they cover. More information on the different file types can be found in our <a className="usa-bold-link" href={`${kGlobalConstants.FILES_SERVER_BASE_URL}/docs/Custom+Account+Data+Dictionary.xlsx`}>Custom Account Data Dictionary</a>.
                    </p>
                </div>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">Why is this data useful?</h4>
                    <p>
                        Account data contains the most encompassing amounts of spending throughout U.S. government agencies.  Unlike award data, account data include spending that is not tied to awards, such as operational costs and employee salaries.
                    </p>
                </div>
                <div className="download-info__section">
                    <h4 className="download-info__section-heading">How do I use this form?</h4>
                    <p>
                        This form allows you to download account data in a range of quarters within a specific fiscal year.
                    </p>
                    <p>
                        Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                    </p>
                    <p>
                        Heads up: all fields are required. You&rsquo;ll only be able to start the download when all sections are properly filled.
                    </p>
                </div>
            </>
        )
    }
    return (
        <>
            <h4 className="download-info__title">About Award Data</h4>
            <div className="download-info__section">
                <p className="download-info__section-heading">What is award data?</p>
                <p>
                    Award data contains all the details of our prime award and sub-award records.
                </p>
            </div>
            <div className="download-info__section">
                <p className="download-info__section-heading">Why would I be interested in this data?</p>
                <p>
                    Downloading this data gives you access to every attribute of any particular award, including
                    data that may not be surfaced on this site.
                </p>
            </div>
            <div className="download-info__section">
                <p className="download-info__section-heading">How do I use this form?</p>
                <p>
                    This form allows you to select specific awards by type; agency and sub-agency; location; and date range.
                    Select an option in each section and click the &ldquo;Download&rdquo; button at the bottom.
                    <b> Please note that most fields are required.</b> You&#39;ll only be able to start the download when all required
                    sections are properly filled in.
                </p>
            </div>
            <div className="download-info__section">
                <Note message={dodNote} />
            </div>
        </>
    );
}


DownloadInfoSection.propTypes = propTypes;
export default DownloadInfoSection;
