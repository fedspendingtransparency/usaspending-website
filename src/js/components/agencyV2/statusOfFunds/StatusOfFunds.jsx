/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow, FlexGridCol, FlexGridContainer } from 'data-transparency-ui';

const propTypes = {
    agencyId: PropTypes.string,
    fy: PropTypes.string
};

const levels = ['Subcomponent', 'Federal Account'];

const StatusOfFunds = ({ agencyId, fy }) => {
    const [level, setLevel] = useState(0);
    return (
        <div className="body__content status-of-funds">
            <FlexGridContainer>
                <FlexGridRow className="status-of-funds__intro" hasGutter>
                    <FlexGridCol>
                        DEV-8046 Intro: agency {agencyId}, FY {fy}
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter>
                    <FlexGridCol className="status-of-funds__drilldown-sidebar" tablet={3}>
                        DEV-8054 drilldown sidebar
                        <div>
                            {level < levels.length - 1 ? (
                                <button onClick={() => setLevel(level + 1)}>
                                    Down
                                </button>
                            ) : ''}
                            {level > 0 ? (
                                <button onClick={() => setLevel(level - 1)}>
                                    Up
                                </button>
                            ) : ''}
                        </div>
                    </FlexGridCol>
                    <FlexGridCol className="status-of-funds__visualization" tablet={9}>
                        DEV-8049 horizontal bar chart viewing {levels[level]}s
                    </FlexGridCol>
                </FlexGridRow>
            </FlexGridContainer>
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;
export default StatusOfFunds;
