/**
 * UnlinkedAwardWarning.jsx
 * Created by Brian Petway 07/07/2022
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
    topMargin: PropTypes.bool,
    widerLayout: PropTypes.bool
};

const UnlinkedAwardWarning = ({ topMargin, widerLayout }) => (
    <section className={`unlinked-award-warning__wrapper ${topMargin ? "top-margin" : ""}`}>
        <FlexGridRow className="unlinked-award-warning__content">
            <FlexGridCol className={`unlinked-award-warning__column-one ${widerLayout ? "wider-layout" : ""}`} width={1} tablet={0.5}>
                <ExclamationTriangle />
            </FlexGridCol>
            <FlexGridCol className="unlinked-award-warning__column-two" width={11}>
                <div className="unlinked-award-warning__heading">
                    This award has not been linked to any federal account.
                </div>
                <div className="unlinked-award-warning__text">
                    This means all financial system data elements (File C) are unavailable on this page and in downloads for this award, including:
                    <ul>
                        <li>Federal and Treasury Account</li>
                        <li>Submission Period</li>
                        <li>Program Activity</li>
                        <li>Object Class</li>
                        <li>Disaster Emergency Fund Code</li>
                        <li>Obligated Amount (as tracked in financial systems)</li>
                        <li>Outlay amount</li>
                    </ul>
                    An award may be unlinked if any of the following apply:
                    <ul>
                        <li>The award lacks a shared ID between spending submitted through agency financial systems (File C) and spending submitted through either FPDS (D1) or FABS (D2). For more information, <Link to="/submission-statistics/data-sources">see “Number of Unlinked Awards” here</Link>.</li>
                        <li>The award has no activity after FY17 Q2.</li>
                        <li>The award is a loan with zero or negative subsidy cost.</li>
                    </ul>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    </section>
);

UnlinkedAwardWarning.propTypes = propTypes;
export default UnlinkedAwardWarning;
