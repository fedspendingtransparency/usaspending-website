/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import schema from 'dataMapping/aboutTheDataSchema';
import AboutTheData from 'components/aboutTheDataSidebar/AboutTheData';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { getDrilldownEntry } from 'helpers/aboutTheDataSidebarHelper';

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
        const { termFromUrl } = props.aboutTheDataSidebar;
        if (termFromUrl) {
            const drilldownEntry = getDrilldownEntry(schema, termFromUrl);
            if (drilldownEntry) {
                props.setAboutTheDataTerm(drilldownEntry);
                props.setAboutTheDataTermFromUrl('');
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
