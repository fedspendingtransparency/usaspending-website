/**
 * DataSourcesAndMethodology.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const propTypes = {
    publicLaw: PropTypes.string
};

const DataSourcesAndMethodology = ({ publicLaw }) => (
    <div className="dsm__container">
        <h4>Data Sources &amp; Methodology</h4>
        <hr />
        <div className="dsm__topSection">
            {publicLaw === 'american-rescue-plan' ?
                <p>Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning March 11, 2021. The data in all tables and visualizations are aggregates of all records tagged with, or otherwise identified as, COVID-19 DEFC V spending.</p>
                :
                <p>Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning April 1, 2020. The data in all tables and visualizations are aggregates of all records tagged with an appropriate COVID-19 DEFC.</p>
            }
            <p><strong>Download Data: </strong>The data downloads will include all data displayed on this page (as well as many additional data elements), with the exception of a few aspects one would need the more granular Account Breakdown by Award data (File C) to reproduce. If you wish to download this more granular data, visit the{' '}<Link to="/download_center/custom_account_data">Custom Account Data</Link> download page.</p>
            <p><Link to="/disaster/covid-19/data-sources">Learn more about our data sources and calculation methods</Link>, including details about our COVID-19 download options.</p>
            {publicLaw === 'american-rescue-plan' ?
                <div />
                :
                <p>USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See a <a target="_blank" href="data/data-limitations.pdf" rel="noopener noreferrer">full description</a> of this issue.</p>
            }
        </div>
    </div>
);

DataSourcesAndMethodology.propTypes = propTypes;
export default DataSourcesAndMethodology;
