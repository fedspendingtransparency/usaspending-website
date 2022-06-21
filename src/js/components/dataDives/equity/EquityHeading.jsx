/**
 * EquityHeading.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from 'prop-types';

const propTypes = {
    content: PropTypes.object
};

const EquityHeading = (props) => {
    const { heading, intro, note } = props.content;
    return (
        <section
            className="equity-heading"
            aria-label="EquityHeading sections">
            <FlexGridRow className="grid-content">
                <FlexGridCol width={12}>
                    <div className="equity-heading__heading">{heading}</div>
                    <div className="equity-heading__stats-row">
                        <div className="equity-heading__pill">Partner Collaboration</div>
                        <div className="equity-heading__date">Jan 18, 2022</div>
                        <div className="equity-heading__dot">&#8226;</div>
                        <div>4 posts</div>
                    </div>
                    <div className="equity-heading__intro">{intro}</div>
                    <div className="equity-heading__note">{note}</div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

EquityHeading.propTypes = propTypes;
export default EquityHeading;
