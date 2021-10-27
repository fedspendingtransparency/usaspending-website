/**
 * DataSourcesAndMethodology.jsx
 * Created by Max Kendall and Marcy Held 07/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    publicLaw: PropTypes.string
};

const DataSourcesAndMethodology = ({ publicLaw }) => (
    <div className={`heading__container ${publicLaw === 'american-rescue-plan' ? 'information-body-arp' : 'information-body'}`}>
        <div className={`${publicLaw === 'american-rescue-plan' ? 'information-top-arp' : 'information-top'} dsm--border-radius`} />
        <div className="dsm__container">
            <h2 className="dsm__heading">Data Sources &amp; Methodology</h2>
            <div className="dsm__topSection">
                {publicLaw === 'american-rescue-plan' ?
                    <p>Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning March 11, 2021. The data in all tables and visualizations are aggregates of all records tagged with, or otherwise identified as, COVID-19 DEFC V spending.</p>
                    :
                    <p>Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning April 1, 2020. The data in all tables and visualizations are aggregates of all records tagged with an appropriate COVID-19 DEFC.</p>
                }
                <p><Link to="/disaster/covid-19/data-sources">Learn more about our data sources and calculation methods</Link>, including details about our COVID-19 download options.</p>
                {publicLaw === 'american-rescue-plan' ?
                    <div />
                    :
                    <p>USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See a <a target="_blank" href="data/data-limitations.pdf" rel="noopener noreferrer">full description</a> of this issue.</p>
                }
            </div>
        </div>
    </div>
);

DataSourcesAndMethodology.propTypes = propTypes;
export default DataSourcesAndMethodology;
