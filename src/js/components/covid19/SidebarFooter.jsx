/**
 * SidebarFooter.jsx
 * Created by James Lee 7/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = { pageName: PropTypes.string };

const SidebarFooter = ({ pageName }) => (
    <div>
        <div className={`${pageName}-sidebar-footer-reference`}>
            &nbsp;
        </div>
        <div className={`${pageName}-sidebar-footer`}>
            <div className={`${pageName}-sidebar-footer__header`}>Learn more about <b>The Federal Response to COVID-19</b> at Data Lab!</div>
            <div className={`${pageName}-sidebar-footer__content`}>
                Visit our sister site,&nbsp;
                <a href="https://datalab.usaspending.gov/federal-covid-funding/" target="_blank" rel="noopener noreferrer">
                    <b>Data Lab &nbsp;
                        <FontAwesomeIcon size="sm" icon="external-link-alt" />
                    </b>
                </a>, to see more ways the government is providing financial relief and explore how funding makes its way from Congress to the economy.

            </div>
        </div>
    </div>
);

export default SidebarFooter;
SidebarFooter.propTypes = propTypes;
