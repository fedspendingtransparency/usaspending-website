/**
 * DataDiveHeading.jsx
 * Created by Brian Petway 06/16/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from 'prop-types';

const propTypes = {
    content: PropTypes.object.isRequired,
    postCount: PropTypes.number.isRequired
};

const DataDiveHeading = ({ content, postCount }) => {
    const {
        heading, intro, note, collab, date
    } = content;
    return (
        <section
            className="equity-heading"
            aria-label="EquityHeading sections">
            <FlexGridRow className="grid-content">
                <FlexGridCol width={12}>
                    <div className="equity-heading__heading">{heading}</div>
                    <div className="equity-heading__stats-row">
                        <div className="equity-heading__pill" style={!collab ? { display: 'none' } : {}}>Partner Collaboration</div>
                        <div className="equity-heading__date">{date}</div>
                        <div className="equity-heading__dot">&#8226;</div>
                        <div>{postCount}&nbsp;posts</div>
                    </div>
                    <div className="equity-heading__intro">{intro}</div>
                    <div className="equity-heading__note">{note}</div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

DataDiveHeading.propTypes = propTypes;
export default DataDiveHeading;
