/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AboutTheData from 'components/aboutTheDataSidebar/AboutTheData';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { getDrilldownEntry } from 'helpers/aboutTheDataSidebarHelper';
import schema from '../../../config/aboutTheData/aboutTheDataSchema';
import Analytics from '../../helpers/analytics/Analytics';

require('components/aboutTheDataSidebar/aboutTheData.scss');

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTerm: PropTypes.func,
    setAboutTheDataTermFromUrl: PropTypes.func,
    clearAboutTheDataTerm: PropTypes.func
};

export const AboutTheDataContainer = (props) => {
    useEffect(() => {
        const { termFromUrl, term, display } = props.aboutTheDataSidebar;

        if (termFromUrl) {
            const drilldownEntry = getDrilldownEntry(schema, termFromUrl);
            if (drilldownEntry) {
                props.setAboutTheDataTerm(drilldownEntry);
                props.setAboutTheDataTermFromUrl('');
            }
        }
        if (display) {
            // only fire analytics if sidebar is open.
            if (term.name && term.slug) {
                // only fire once name and slug are set.
                Analytics.event({
                    category: 'About the Data Link Clicked',
                    action: `about-the-data-click-${term.slug}`,
                    label: `About the Data ${term.name} link clicked`
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.aboutTheDataSidebar]);

    return (
        <div className="usa-atd-animations">
            <AboutTheData {...props} schema={schema} />
        </div>
    );
};

AboutTheDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        aboutTheDataSidebar: state.aboutTheDataSidebar
    }),
    (dispatch) => bindActionCreators(aboutTheDataActions, dispatch)
)(AboutTheDataContainer);
